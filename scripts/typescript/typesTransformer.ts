import type {
  Node,
  SourceFile,
  Statement,
  TransformationContext,
  Transformer,
} from "@typescript/typescript6";
import typescript from "@typescript/typescript6";

import typesFilter from "./typesFilter.ts";

const DEBUG = process.env.DEBUG_MODULE;

function visitChildren(context: TransformationContext): Transformer<Node> {
  return (node: Node): Node => {
    if (typescript.isImportTypeNode(node) && node.qualifier) {
      return node.qualifier;
    }

    return typescript.visitEachChild(node, visitChildren(context), context);
  };
}

function visitStatements(context: TransformationContext): Transformer<Statement> {
  return (node: Statement): Statement => {
    return typescript.visitEachChild(node, visitChildren(context), context);
  };
}

function moduleCommentStatement(module: typescript.ModuleDeclaration) {
  const commentNode = typescript.factory.createNotEmittedStatement(undefined!);
  return typescript.addSyntheticLeadingComment(
    commentNode,
    typescript.SyntaxKind.SingleLineCommentTrivia,
    ` Origin module: ${module.name.getText()}`,
  );
}

function visitRoot(context: TransformationContext): Transformer<SourceFile> {
  return (node: SourceFile): SourceFile => {
    const mergedStatements: Statement[] = [];

    for (const statement of node.statements) {
      if (!typescript.isModuleDeclaration(statement)) {
        continue;
      }

      // In Debug skip some declarations to test on specific blocks
      if (DEBUG && statement.name.getText().replaceAll('"', "") !== DEBUG) {
        continue;
      }

      const body = statement.body;

      if (!body || !typescript.isModuleBlock(body)) {
        continue;
      }

      mergedStatements.push(moduleCommentStatement(statement));

      const visitor = visitStatements(context);

      for (const nestedStatement of body.statements) {
        if (typesFilter.shouldFilter(nestedStatement)) {
          continue;
        }

        mergedStatements.push(typescript.visitNode(nestedStatement, visitor) as Statement);
      }
    }
    const newBlock = typescript.factory.createModuleBlock(mergedStatements);

    const newDeclaration = typescript.factory.createModuleDeclaration(
      [typescript.factory.createModifier(typescript.SyntaxKind.DeclareKeyword)],
      typescript.factory.createIdentifier("Shapez"),
      newBlock,
    );

    return typescript.factory.updateSourceFile(node, [newDeclaration]);
  };
}

function transformer(context: TransformationContext): Transformer<SourceFile> {
  return (node) => typescript.visitNode(node, visitRoot(context)) as SourceFile;
}

function transformTypes(inputTypes: string): string {
  const sourceFile = typescript.createSourceFile(
    "",
    inputTypes,
    typescript.ScriptTarget.ESNext,
    true,
  );

  const result = typescript.transform(sourceFile, [transformer]);
  const transformed = result.transformed[0];
  result.dispose();

  const printer = typescript.createPrinter({ newLine: typescript.NewLineKind.LineFeed });
  return printer.printNode(typescript.EmitHint.Unspecified, transformed, sourceFile);
}

export default {
  transformTypes,
};

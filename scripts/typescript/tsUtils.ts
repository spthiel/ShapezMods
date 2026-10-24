import typescript from "@typescript/typescript6";

function createStatement(code: string): typescript.Statement {
  const sourceFile = typescript.createSourceFile(
    "temp.ts",
    code,
    typescript.ScriptTarget.Latest,
    true,
  );

  return sourceFile.statements[0];
}

function createMethodDeclaration(code: string): typescript.MethodDeclaration {
  const classDeclaration = createStatement(`class Temp {${code}}`) as typescript.ClassDeclaration;
  return classDeclaration.members.find(typescript.isMethodDeclaration)!;
}

export default {
  createStatement,
  createMethodDeclaration,
};

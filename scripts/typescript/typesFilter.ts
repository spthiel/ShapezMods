import typescript from "@typescript/typescript6";

function filterTypeAliasImports(statement: typescript.Statement): boolean {
  if (!typescript.isTypeAliasDeclaration(statement)) {
    return false;
  }

  return !!statement.getChildren().find((node) => typescript.isImportTypeNode(node));
}

function filterImports(statement: typescript.Statement): boolean {
  return typescript.isImportDeclaration(statement);
}

function shouldFilter(statement: typescript.Statement): boolean {
  return filterImports(statement) || filterTypeAliasImports(statement);
}

function asFilterFunction(statement: typescript.Statement): boolean {
  return !shouldFilter(statement);
}

export default {
  shouldFilter,
  asFilterFunction,
};

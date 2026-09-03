// Converte valores JS simples (vindos das testCases) em literais C#, de acordo
// com o tipo declarado em csharpParamTypes para cada exercício.

function toCSharpLiteral(value, type) {
  switch (type) {
    case "int":
    case "long":
    case "double":
      return String(value);
    case "bool":
      return value ? "true" : "false";
    case "string":
      return JSON.stringify(String(value));
    case "int[]": {
      const items = value.map((v) => String(v)).join(", ");
      return `new int[] { ${items} }`;
    }
    case "string[]": {
      const items = value.map((v) => JSON.stringify(String(v))).join(", ");
      return `new string[] { ${items} }`;
    }
    default:
      throw new Error(`Tipo C# não suportado: ${type}`);
  }
}

module.exports = { toCSharpLiteral };

// Conteúdo didático: 3 linguagens x 3 dificuldades x 3 exercícios = 27 exercícios.
// mode "stdout"  -> compara a saída padrão exata (trim) do programa.
// mode "function" -> o código do usuário deve declarar uma função/método;
//                    o executor injeta um "harness" que chama a função com
//                    testCases e compara o valor retornado (via JSON).

const LANGS = {
  python: { label: "Python", color: "#3776AB", icon: "🐍" },
  javascript: { label: "JavaScript", color: "#F7DF1E", icon: "🟨" },
  csharp: { label: "C#", color: "#9B4F96", icon: "🟣" },
};

const DIFFICULTIES = {
  iniciante: { label: "Iniciante", order: 1, xpBase: 10 },
  intermediario: { label: "Intermediário", order: 2, xpBase: 20 },
  avancado: { label: "Avançado", order: 3, xpBase: 30 },
};

const exercises = [
  // ============================= PYTHON =============================
  {
    id: "python-iniciante-1",
    language: "python",
    difficulty: "iniciante",
    order: 1,
    title: "Olá, Mundo!",
    xp: 10,
    theory:
      "Todo programador começa por aqui. Em Python, a função print() exibe um texto na tela.\n\n" +
      "Exemplo:\nprint(\"Estou aprendendo Python!\")\n\n" +
      "Texto (strings) ficam entre aspas simples ou duplas. Sua missão: usar print() para exibir exatamente a frase pedida.",
    starterCode:
      "# Use a função print() para exibir a mensagem na tela.\n" +
      "# Exiba exatamente: Ola, Mundo!\n\n",
    mode: "stdout",
    expectedStdout: "Ola, Mundo!",
    hints: [
      "A sintaxe é print(\"texto aqui\").",
      "Preste atenção às maiúsculas: a frase começa com 'O' maiúsculo em 'Ola'.",
    ],
  },
  {
    id: "python-iniciante-2",
    language: "python",
    difficulty: "iniciante",
    order: 2,
    title: "Variáveis e Soma",
    xp: 10,
    theory:
      "Funções em Python são criadas com def. Elas recebem parâmetros e devolvem um valor com return.\n\n" +
      "def dobro(x):\n    return x * 2\n\n" +
      "Complete a função soma(a, b) para que ela retorne a soma de dois números.",
    starterCode:
      "def soma(a, b):\n    # some os dois números e retorne o resultado\n    pass\n",
    mode: "function",
    functionName: "soma",
    testCases: [
      { args: [2, 3], expected: 5 },
      { args: [10, 20], expected: 30 },
      { args: [-5, 5], expected: 0 },
    ],
    hints: ["Substitua 'pass' por 'return a + b'."],
  },
  {
    id: "python-iniciante-3",
    language: "python",
    difficulty: "iniciante",
    order: 3,
    title: "Condicionais",
    xp: 10,
    theory:
      "Estruturas condicionais (if / elif / else) permitem que o programa tome decisões.\n\n" +
      "if a > b:\n    return a\nelse:\n    return b\n\n" +
      "Complete a função maior(a, b) para retornar o maior dos dois valores.",
    starterCode:
      "def maior(a, b):\n    # retorne o maior valor entre a e b\n    pass\n",
    mode: "function",
    functionName: "maior",
    testCases: [
      { args: [3, 7], expected: 7 },
      { args: [10, 2], expected: 10 },
      { args: [5, 5], expected: 5 },
    ],
    hints: ["Use if a >= b: return a, senão return b."],
  },
  {
    id: "python-intermediario-1",
    language: "python",
    difficulty: "intermediario",
    order: 1,
    title: "Laços de Repetição",
    xp: 20,
    theory:
      "O laço for percorre uma sequência de números com range().\n\n" +
      "total = 0\nfor i in range(1, n + 1):\n    total += i\n\n" +
      "Complete soma_ate(n) para retornar a soma de todos os inteiros de 1 até n (incluso).",
    starterCode:
      "def soma_ate(n):\n    # some todos os números de 1 até n\n    total = 0\n    # escreva seu laço aqui\n    return total\n",
    mode: "function",
    functionName: "soma_ate",
    testCases: [
      { args: [5], expected: 15 },
      { args: [1], expected: 1 },
      { args: [10], expected: 55 },
    ],
    hints: ["range(1, n + 1) inclui o número n."],
  },
  {
    id: "python-intermediario-2",
    language: "python",
    difficulty: "intermediario",
    order: 2,
    title: "Listas",
    xp: 20,
    theory:
      "Listas guardam várias informações em sequência: numeros = [1, 2, 3].\n\n" +
      "É possível criar uma nova lista transformando cada item com list comprehension:\n" +
      "[x * 2 for x in numeros]\n\n" +
      "Complete dobra_lista(lista) para retornar uma nova lista com cada elemento multiplicado por 2.",
    starterCode:
      "def dobra_lista(lista):\n    # retorne uma nova lista com cada item multiplicado por 2\n    pass\n",
    mode: "function",
    functionName: "dobra_lista",
    testCases: [
      { args: [[1, 2, 3]], expected: [2, 4, 6] },
      { args: [[]], expected: [] },
      { args: [[5]], expected: [10] },
    ],
    hints: ["return [x * 2 for x in lista]"],
  },
  {
    id: "python-intermediario-3",
    language: "python",
    difficulty: "intermediario",
    order: 3,
    title: "Strings",
    xp: 20,
    theory:
      "Strings em Python podem ser fatiadas (slicing). texto[::-1] inverte uma string inteira.\n\n" +
      "Complete inverte_texto(texto) para retornar o texto invertido.",
    starterCode:
      "def inverte_texto(texto):\n    # retorne o texto invertido\n    pass\n",
    mode: "function",
    functionName: "inverte_texto",
    testCases: [
      { args: ["abc"], expected: "cba" },
      { args: ["ana"], expected: "ana" },
      { args: ["Python"], expected: "nohtyP" },
    ],
    hints: ["return texto[::-1]"],
  },
  {
    id: "python-avancado-1",
    language: "python",
    difficulty: "avancado",
    order: 1,
    title: "Recursão",
    xp: 30,
    theory:
      "Uma função recursiva chama a si mesma até atingir um caso base.\n\n" +
      "def fatorial(n):\n    if n <= 1:\n        return 1\n    return n * fatorial(n - 1)\n\n" +
      "Implemente fatorial(n) que retorna n! (n fatorial) usando recursão.",
    starterCode:
      "def fatorial(n):\n    # caso base + chamada recursiva\n    pass\n",
    mode: "function",
    functionName: "fatorial",
    testCases: [
      { args: [5], expected: 120 },
      { args: [0], expected: 1 },
      { args: [6], expected: 720 },
    ],
    hints: ["Caso base: n <= 1 retorna 1.", "Caso recursivo: n * fatorial(n - 1)."],
  },
  {
    id: "python-avancado-2",
    language: "python",
    difficulty: "avancado",
    order: 2,
    title: "Estruturas de Dados",
    xp: 30,
    theory:
      "Conjuntos (set) não armazenam itens duplicados. Você pode combinar set com lista " +
      "para remover duplicados mantendo a ordem de aparição.\n\n" +
      "Implemente remove_duplicados(lista) que retorna uma nova lista sem elementos repetidos, " +
      "preservando a ordem original da primeira ocorrência.",
    starterCode:
      "def remove_duplicados(lista):\n    # retorne a lista sem duplicados, preservando a ordem\n    vistos = set()\n    resultado = []\n    # complete a lógica\n    return resultado\n",
    mode: "function",
    functionName: "remove_duplicados",
    testCases: [
      { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
      { args: [[1, 1, 1]], expected: [1] },
      { args: [[]], expected: [] },
    ],
    hints: [
      "Percorra a lista; se o item não estiver em 'vistos', adicione a 'resultado' e a 'vistos'.",
    ],
  },
  {
    id: "python-avancado-3",
    language: "python",
    difficulty: "avancado",
    order: 3,
    title: "Algoritmos: Números Primos",
    xp: 30,
    theory:
      "Um número primo só é divisível por 1 e por ele mesmo (e é maior que 1).\n\n" +
      "Para verificar, teste divisores de 2 até a raiz quadrada de n.\n\n" +
      "Implemente eh_primo(n) retornando True se n for primo, False caso contrário.",
    starterCode:
      "def eh_primo(n):\n    # retorne True se n for primo, False caso contrário\n    pass\n",
    mode: "function",
    functionName: "eh_primo",
    testCases: [
      { args: [7], expected: true },
      { args: [8], expected: false },
      { args: [2], expected: true },
    ],
    hints: [
      "n < 2 nunca é primo.",
      "Teste i de 2 até int(n ** 0.5) + 1; se algum dividir n, não é primo.",
    ],
  },

  // ============================ JAVASCRIPT ============================
  {
    id: "javascript-iniciante-1",
    language: "javascript",
    difficulty: "iniciante",
    order: 1,
    title: "Olá, Mundo!",
    xp: 10,
    theory:
      "Em JavaScript, console.log() exibe um texto no console.\n\n" +
      'console.log("Estou aprendendo JavaScript!");\n\n' +
      "Sua missão: usar console.log() para exibir exatamente a frase pedida.",
    starterCode:
      "// Use console.log() para exibir a mensagem.\n// Exiba exatamente: Ola, Mundo!\n\n",
    mode: "stdout",
    expectedStdout: "Ola, Mundo!",
    hints: ['A sintaxe é console.log("texto aqui");'],
  },
  {
    id: "javascript-iniciante-2",
    language: "javascript",
    difficulty: "iniciante",
    order: 2,
    title: "Variáveis e Soma",
    xp: 10,
    theory:
      "Funções em JavaScript podem ser declaradas com a palavra-chave function.\n\n" +
      "function dobro(x) {\n  return x * 2;\n}\n\n" +
      "Complete a função soma(a, b) para que ela retorne a soma de dois números.",
    starterCode:
      "function soma(a, b) {\n  // some os dois números e retorne o resultado\n}\n",
    mode: "function",
    functionName: "soma",
    testCases: [
      { args: [2, 3], expected: 5 },
      { args: [10, 20], expected: 30 },
      { args: [-5, 5], expected: 0 },
    ],
    hints: ["Use return a + b;"],
  },
  {
    id: "javascript-iniciante-3",
    language: "javascript",
    difficulty: "iniciante",
    order: 3,
    title: "Condicionais",
    xp: 10,
    theory:
      "Estruturas condicionais (if / else) permitem tomar decisões no código.\n\n" +
      "if (a > b) {\n  return a;\n} else {\n  return b;\n}\n\n" +
      "Complete a função maior(a, b) para retornar o maior dos dois valores.",
    starterCode:
      "function maior(a, b) {\n  // retorne o maior valor entre a e b\n}\n",
    mode: "function",
    functionName: "maior",
    testCases: [
      { args: [3, 7], expected: 7 },
      { args: [10, 2], expected: 10 },
      { args: [5, 5], expected: 5 },
    ],
    hints: ["if (a >= b) return a; else return b;"],
  },
  {
    id: "javascript-intermediario-1",
    language: "javascript",
    difficulty: "intermediario",
    order: 1,
    title: "Laços de Repetição",
    xp: 20,
    theory:
      "O laço for percorre um intervalo de números.\n\n" +
      "let total = 0;\nfor (let i = 1; i <= n; i++) {\n  total += i;\n}\n\n" +
      "Complete somaAte(n) para retornar a soma de todos os inteiros de 1 até n (incluso).",
    starterCode:
      "function somaAte(n) {\n  // some todos os números de 1 até n\n  let total = 0;\n  // escreva seu laço aqui\n  return total;\n}\n",
    mode: "function",
    functionName: "somaAte",
    testCases: [
      { args: [5], expected: 15 },
      { args: [1], expected: 1 },
      { args: [10], expected: 55 },
    ],
    hints: ["for (let i = 1; i <= n; i++) total += i;"],
  },
  {
    id: "javascript-intermediario-2",
    language: "javascript",
    difficulty: "intermediario",
    order: 2,
    title: "Arrays",
    xp: 20,
    theory:
      "Arrays guardam várias informações em sequência: const numeros = [1, 2, 3].\n\n" +
      "O método map() cria um novo array transformando cada item:\n" +
      "numeros.map(x => x * 2)\n\n" +
      "Complete dobraLista(lista) para retornar um novo array com cada elemento multiplicado por 2.",
    starterCode:
      "function dobraLista(lista) {\n  // retorne um novo array com cada item multiplicado por 2\n}\n",
    mode: "function",
    functionName: "dobraLista",
    testCases: [
      { args: [[1, 2, 3]], expected: [2, 4, 6] },
      { args: [[]], expected: [] },
      { args: [[5]], expected: [10] },
    ],
    hints: ["return lista.map(x => x * 2);"],
  },
  {
    id: "javascript-intermediario-3",
    language: "javascript",
    difficulty: "intermediario",
    order: 3,
    title: "Strings",
    xp: 20,
    theory:
      "Strings podem virar arrays de caracteres com split(''), ser invertidas com reverse() " +
      "e voltarem a ser texto com join('').\n\n" +
      "Complete inverteTexto(texto) para retornar o texto invertido.",
    starterCode:
      "function inverteTexto(texto) {\n  // retorne o texto invertido\n}\n",
    mode: "function",
    functionName: "inverteTexto",
    testCases: [
      { args: ["abc"], expected: "cba" },
      { args: ["ana"], expected: "ana" },
      { args: ["Python"], expected: "nohtyP" },
    ],
    hints: ["return texto.split('').reverse().join('');"],
  },
  {
    id: "javascript-avancado-1",
    language: "javascript",
    difficulty: "avancado",
    order: 1,
    title: "Recursão",
    xp: 30,
    theory:
      "Uma função recursiva chama a si mesma até atingir um caso base.\n\n" +
      "function fatorial(n) {\n  if (n <= 1) return 1;\n  return n * fatorial(n - 1);\n}\n\n" +
      "Implemente fatorial(n) que retorna n! (n fatorial) usando recursão.",
    starterCode:
      "function fatorial(n) {\n  // caso base + chamada recursiva\n}\n",
    mode: "function",
    functionName: "fatorial",
    testCases: [
      { args: [5], expected: 120 },
      { args: [0], expected: 1 },
      { args: [6], expected: 720 },
    ],
    hints: ["Caso base: if (n <= 1) return 1;", "Caso recursivo: return n * fatorial(n - 1);"],
  },
  {
    id: "javascript-avancado-2",
    language: "javascript",
    difficulty: "avancado",
    order: 2,
    title: "Estruturas de Dados",
    xp: 30,
    theory:
      "O objeto Set não armazena itens duplicados. Combinado com o spread operator, " +
      "é possível remover duplicados: [...new Set(lista)].\n\n" +
      "Implemente removeDuplicados(lista) que retorna um novo array sem elementos repetidos, " +
      "preservando a ordem original da primeira ocorrência.",
    starterCode:
      "function removeDuplicados(lista) {\n  // retorne a lista sem duplicados, preservando a ordem\n}\n",
    mode: "function",
    functionName: "removeDuplicados",
    testCases: [
      { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
      { args: [[1, 1, 1]], expected: [1] },
      { args: [[]], expected: [] },
    ],
    hints: ["return [...new Set(lista)];"],
  },
  {
    id: "javascript-avancado-3",
    language: "javascript",
    difficulty: "avancado",
    order: 3,
    title: "Algoritmos: Números Primos",
    xp: 30,
    theory:
      "Um número primo só é divisível por 1 e por ele mesmo (e é maior que 1).\n\n" +
      "Para verificar, teste divisores de 2 até a raiz quadrada de n.\n\n" +
      "Implemente ehPrimo(n) retornando true se n for primo, false caso contrário.",
    starterCode:
      "function ehPrimo(n) {\n  // retorne true se n for primo, false caso contrário\n}\n",
    mode: "function",
    functionName: "ehPrimo",
    testCases: [
      { args: [7], expected: true },
      { args: [8], expected: false },
      { args: [2], expected: true },
    ],
    hints: [
      "n < 2 nunca é primo.",
      "Teste i de 2 até Math.sqrt(n); se algum dividir n, não é primo.",
    ],
  },

  // ================================ C# ================================
  {
    id: "csharp-iniciante-1",
    language: "csharp",
    difficulty: "iniciante",
    order: 1,
    title: "Olá, Mundo!",
    xp: 10,
    theory:
      "Em C#, Console.WriteLine() exibe um texto no console.\n\n" +
      'Console.WriteLine("Estou aprendendo C#!");\n\n' +
      "Sua missão: usar Console.WriteLine() para exibir exatamente a frase pedida.",
    starterCode:
      "// Use Console.WriteLine() para exibir a mensagem.\n// Exiba exatamente: Ola, Mundo!\n\n",
    mode: "stdout",
    expectedStdout: "Ola, Mundo!",
    hints: ['A sintaxe é Console.WriteLine("texto aqui");'],
  },
  {
    id: "csharp-iniciante-2",
    language: "csharp",
    difficulty: "iniciante",
    order: 2,
    title: "Variáveis e Soma",
    xp: 10,
    theory:
      "Em C#, métodos são fortemente tipados: você declara o tipo de retorno e dos parâmetros.\n\n" +
      "static int Dobro(int x)\n{\n    return x * 2;\n}\n\n" +
      "Complete o método Soma(a, b) para que ele retorne a soma de dois números.",
    starterCode:
      "static int Soma(int a, int b)\n{\n    // some os dois números e retorne o resultado\n    return 0;\n}\n",
    mode: "function",
    functionName: "Soma",
    csharpParamTypes: ["int", "int"],
    testCases: [
      { args: [2, 3], expected: 5 },
      { args: [10, 20], expected: 30 },
      { args: [-5, 5], expected: 0 },
    ],
    hints: ["Use return a + b;"],
  },
  {
    id: "csharp-iniciante-3",
    language: "csharp",
    difficulty: "iniciante",
    order: 3,
    title: "Condicionais",
    xp: 10,
    theory:
      "Estruturas condicionais (if / else) permitem tomar decisões no código.\n\n" +
      "if (a > b)\n{\n    return a;\n}\nelse\n{\n    return b;\n}\n\n" +
      "Complete o método Maior(a, b) para retornar o maior dos dois valores.",
    starterCode:
      "static int Maior(int a, int b)\n{\n    // retorne o maior valor entre a e b\n    return 0;\n}\n",
    mode: "function",
    functionName: "Maior",
    csharpParamTypes: ["int", "int"],
    testCases: [
      { args: [3, 7], expected: 7 },
      { args: [10, 2], expected: 10 },
      { args: [5, 5], expected: 5 },
    ],
    hints: ["if (a >= b) return a; else return b;"],
  },
  {
    id: "csharp-intermediario-1",
    language: "csharp",
    difficulty: "intermediario",
    order: 1,
    title: "Laços de Repetição",
    xp: 20,
    theory:
      "O laço for percorre um intervalo de números.\n\n" +
      "int total = 0;\nfor (int i = 1; i <= n; i++)\n{\n    total += i;\n}\n\n" +
      "Complete SomaAte(n) para retornar a soma de todos os inteiros de 1 até n (incluso).",
    starterCode:
      "static int SomaAte(int n)\n{\n    // some todos os números de 1 até n\n    int total = 0;\n    // escreva seu laço aqui\n    return total;\n}\n",
    mode: "function",
    functionName: "SomaAte",
    csharpParamTypes: ["int"],
    testCases: [
      { args: [5], expected: 15 },
      { args: [1], expected: 1 },
      { args: [10], expected: 55 },
    ],
    hints: ["for (int i = 1; i <= n; i++) total += i;"],
  },
  {
    id: "csharp-intermediario-2",
    language: "csharp",
    difficulty: "intermediario",
    order: 2,
    title: "Arrays",
    xp: 20,
    theory:
      "Arrays guardam várias informações em sequência: int[] numeros = { 1, 2, 3 };\n\n" +
      "Você pode criar um novo array percorrendo o original com um laço for.\n\n" +
      "Complete DobraLista(lista) para retornar um novo array com cada elemento multiplicado por 2.",
    starterCode:
      "static int[] DobraLista(int[] lista)\n{\n    // retorne um novo array com cada item multiplicado por 2\n    int[] resultado = new int[lista.Length];\n    // escreva seu laço aqui\n    return resultado;\n}\n",
    mode: "function",
    functionName: "DobraLista",
    csharpParamTypes: ["int[]"],
    testCases: [
      { args: [[1, 2, 3]], expected: [2, 4, 6] },
      { args: [[]], expected: [] },
      { args: [[5]], expected: [10] },
    ],
    hints: ["for (int i = 0; i < lista.Length; i++) resultado[i] = lista[i] * 2;"],
  },
  {
    id: "csharp-intermediario-3",
    language: "csharp",
    difficulty: "intermediario",
    order: 3,
    title: "Strings",
    xp: 20,
    theory:
      "Em C#, um array de caracteres pode ser criado com ToCharArray(), invertido com " +
      "Array.Reverse() e reconstruído com o construtor de string.\n\n" +
      "Complete InverteTexto(texto) para retornar o texto invertido.",
    starterCode:
      "static string InverteTexto(string texto)\n{\n    // retorne o texto invertido\n    return texto;\n}\n",
    mode: "function",
    functionName: "InverteTexto",
    csharpParamTypes: ["string"],
    testCases: [
      { args: ["abc"], expected: "cba" },
      { args: ["ana"], expected: "ana" },
      { args: ["Python"], expected: "nohtyP" },
    ],
    hints: [
      "char[] arr = texto.ToCharArray(); Array.Reverse(arr); return new string(arr);",
    ],
  },
  {
    id: "csharp-avancado-1",
    language: "csharp",
    difficulty: "avancado",
    order: 1,
    title: "Recursão",
    xp: 30,
    theory:
      "Uma função recursiva chama a si mesma até atingir um caso base.\n\n" +
      "static long Fatorial(int n)\n{\n    if (n <= 1) return 1;\n    return n * Fatorial(n - 1);\n}\n\n" +
      "Implemente Fatorial(n) que retorna n! (n fatorial) usando recursão.",
    starterCode:
      "static long Fatorial(int n)\n{\n    // caso base + chamada recursiva\n    return 0;\n}\n",
    mode: "function",
    functionName: "Fatorial",
    csharpParamTypes: ["int"],
    testCases: [
      { args: [5], expected: 120 },
      { args: [0], expected: 1 },
      { args: [6], expected: 720 },
    ],
    hints: ["Caso base: if (n <= 1) return 1;", "Caso recursivo: return n * Fatorial(n - 1);"],
  },
  {
    id: "csharp-avancado-2",
    language: "csharp",
    difficulty: "avancado",
    order: 2,
    title: "Estruturas de Dados",
    xp: 30,
    theory:
      "HashSet<int> não armazena itens duplicados e permite checar existência rapidamente " +
      "com Contains(). Combine com List<int> para manter a ordem de inserção.\n\n" +
      "Implemente RemoveDuplicados(lista) que retorna um novo array sem elementos repetidos, " +
      "preservando a ordem original da primeira ocorrência.",
    starterCode:
      "static int[] RemoveDuplicados(int[] lista)\n{\n    // retorne a lista sem duplicados, preservando a ordem\n    var vistos = new HashSet<int>();\n    var resultado = new List<int>();\n    // complete a lógica\n    return resultado.ToArray();\n}\n",
    mode: "function",
    functionName: "RemoveDuplicados",
    csharpParamTypes: ["int[]"],
    testCases: [
      { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
      { args: [[1, 1, 1]], expected: [1] },
      { args: [[]], expected: [] },
    ],
    hints: [
      "Percorra lista; se vistos.Add(item) retornar true, adicione o item a resultado.",
    ],
  },
  {
    id: "csharp-avancado-3",
    language: "csharp",
    difficulty: "avancado",
    order: 3,
    title: "Algoritmos: Números Primos",
    xp: 30,
    theory:
      "Um número primo só é divisível por 1 e por ele mesmo (e é maior que 1).\n\n" +
      "Para verificar, teste divisores de 2 até a raiz quadrada de n.\n\n" +
      "Implemente EhPrimo(n) retornando true se n for primo, false caso contrário.",
    starterCode:
      "static bool EhPrimo(int n)\n{\n    // retorne true se n for primo, false caso contrário\n    return false;\n}\n",
    mode: "function",
    functionName: "EhPrimo",
    csharpParamTypes: ["int"],
    testCases: [
      { args: [7], expected: true },
      { args: [8], expected: false },
      { args: [2], expected: true },
    ],
    hints: [
      "n < 2 nunca é primo.",
      "Teste i de 2 até (int)Math.Sqrt(n); se algum dividir n, não é primo.",
    ],
  },
];

module.exports = { LANGS, DIFFICULTIES, exercises };

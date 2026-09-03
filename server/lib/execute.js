const { runJsFile } = require("./runners/js");
const { runPythonFile } = require("./runners/python");
const { runCsharpFile } = require("./runners/csharp");
const { toCSharpLiteral } = require("./csharpLiteral");
const { exercises } = require("../data/exercises");

const RESULT_PREFIX = "@@RESULT@@";
const ERROR_PREFIX = "@@ERROR@@";

function b64(str) {
  return Buffer.from(str, "utf8").toString("base64");
}

function indent(code, spaces) {
  const pad = " ".repeat(spaces);
  return code
    .split("\n")
    .map((line) => (line.length ? pad + line : line))
    .join("\n");
}

function buildJsCode(exercise, userCode) {
  if (exercise.mode === "stdout") {
    return userCode;
  }
  const argsJson = JSON.stringify(exercise.testCases.map((t) => t.args));
  const harness = `
;(function () {
  const __testCases = JSON.parse(Buffer.from("${b64(argsJson)}", "base64").toString("utf8"));
  for (const __args of __testCases) {
    try {
      const __r = ${exercise.functionName}(...__args);
      console.log(${JSON.stringify(RESULT_PREFIX)} + JSON.stringify(__r === undefined ? null : __r));
    } catch (__e) {
      console.log(${JSON.stringify(ERROR_PREFIX)} + (__e && __e.message ? __e.message : String(__e)));
    }
  }
})();
`;
  return userCode + "\n" + harness;
}

function buildPythonCode(exercise, userCode) {
  if (exercise.mode === "stdout") {
    return userCode;
  }
  const argsJson = JSON.stringify(exercise.testCases.map((t) => t.args));
  const harness = `
import json, base64
__test_cases = json.loads(base64.b64decode("${b64(argsJson)}").decode("utf-8"))
for __args in __test_cases:
    try:
        __r = ${exercise.functionName}(*__args)
        print(${JSON.stringify(RESULT_PREFIX)} + json.dumps(__r))
    except Exception as __e:
        print(${JSON.stringify(ERROR_PREFIX)} + str(__e))
`;
  return userCode + "\n" + harness;
}

function buildCsharpCode(exercise, userCode) {
  if (exercise.mode === "stdout") {
    return `using System;\n\n${userCode}`;
  }
  const paramTypes = exercise.csharpParamTypes || [];
  const calls = exercise.testCases
    .map((tc, i) => {
      const literalArgs = tc.args
        .map((a, idx) => toCSharpLiteral(a, paramTypes[idx]))
        .join(", ");
      return `        try
        {
            var __r${i} = ${exercise.functionName}(${literalArgs});
            Console.WriteLine("${RESULT_PREFIX}" + JsonSerializer.Serialize(__r${i}));
        }
        catch (Exception __e)
        {
            Console.WriteLine("${ERROR_PREFIX}" + __e.Message);
        }`;
    })
    .join("\n");

  return `using System;
using System.Linq;
using System.Text.Json;
using System.Collections.Generic;

class Program
{
${indent(userCode, 4)}

    static void Main()
    {
${calls}
    }
}
`;
}

function parseHarnessOutput(stdout) {
  const lines = stdout.split(/\r?\n/);
  const results = [];
  for (const line of lines) {
    if (line.startsWith(RESULT_PREFIX)) {
      const raw = line.slice(RESULT_PREFIX.length);
      try {
        results.push({ ok: true, value: JSON.parse(raw) });
      } catch (e) {
        results.push({ ok: false, error: "Falha ao interpretar o resultado." });
      }
    } else if (line.startsWith(ERROR_PREFIX)) {
      results.push({ ok: false, error: line.slice(ERROR_PREFIX.length) });
    }
  }
  return results;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function sanitizeCsharpText(text) {
  if (!text) return text;
  return text.replace(
    /[A-Za-z]:\\(?:[\w.\-]+\\)*([\w.\-]+\.(?:cs|csproj))/g,
    "$1"
  );
}

function cleanStderr(stderr, language) {
  if (!stderr) return "";
  if (language === "csharp") {
    return sanitizeCsharpText(stderr)
      .split(/\r?\n/)
      .filter((l) => l.trim().length > 0)
      .slice(0, 15)
      .join("\n");
  }
  return stderr;
}

async function executeSubmission(exerciseId, code) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (!exercise) {
    throw new Error("Exercício não encontrado");
  }
  if (typeof code !== "string" || code.length > 20000) {
    throw new Error("Código inválido");
  }

  let runResult;

  if (exercise.language === "javascript") {
    runResult = await runJsFile(buildJsCode(exercise, code));
  } else if (exercise.language === "python") {
    runResult = await runPythonFile(buildPythonCode(exercise, code));
  } else if (exercise.language === "csharp") {
    runResult = await runCsharpFile(buildCsharpCode(exercise, code));
  } else {
    throw new Error("Linguagem não suportada");
  }

  let { stdout, stderr, timedOut } = runResult;
  if (exercise.language === "csharp") {
    stdout = sanitizeCsharpText(stdout);
    stderr = sanitizeCsharpText(stderr);
  }

  if (exercise.mode === "stdout") {
    const actual = (stdout || "").trim();
    const expected = exercise.expectedStdout.trim();
    const passed = !timedOut && actual === expected;
    return {
      success: passed,
      timedOut,
      xp: passed ? exercise.xp : 0,
      stdout: actual,
      stderr: cleanStderr(stderr, exercise.language),
      testResults: [
        {
          description: "Saída esperada",
          passed,
          expected,
          actual,
        },
      ],
    };
  }

  const parsed = parseHarnessOutput(stdout);

  let displayStdout = stdout;
  let displayStderr = cleanStderr(stderr, exercise.language);
  if (parsed.length === 0 && exercise.language === "csharp") {
    const compileLines = stdout
      .split(/\r?\n/)
      .filter((l) => l.includes("error"))
      .slice(0, 15)
      .join("\n");
    if (compileLines) {
      displayStderr = [displayStderr, compileLines].filter(Boolean).join("\n");
    }
    displayStdout = "";
  }

  const testResults = exercise.testCases.map((tc, i) => {
    const r = parsed[i];
    if (!r) {
      return {
        description: `Caso ${i + 1}`,
        passed: false,
        expected: tc.expected,
        actual: null,
        error: timedOut
          ? "Tempo limite excedido"
          : "Sem resultado (verifique erros de compilação/execução)",
      };
    }
    if (!r.ok) {
      return {
        description: `Caso ${i + 1}`,
        passed: false,
        expected: tc.expected,
        actual: null,
        error: r.error,
      };
    }
    return {
      description: `Caso ${i + 1}`,
      passed: deepEqual(r.value, tc.expected),
      expected: tc.expected,
      actual: r.value,
    };
  });

  const success = !timedOut && testResults.every((t) => t.passed);

  return {
    success,
    timedOut,
    xp: success ? exercise.xp : 0,
    stdout: displayStdout,
    stderr: displayStderr,
    testResults,
  };
}

module.exports = { executeSubmission };

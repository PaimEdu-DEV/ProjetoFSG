const express = require("express");
const { exercises, LANGS, DIFFICULTIES } = require("../data/exercises");
const { executeSubmission } = require("../lib/execute");

const router = express.Router();

function sanitizeExercise(e) {
  return {
    id: e.id,
    language: e.language,
    difficulty: e.difficulty,
    order: e.order,
    title: e.title,
    xp: e.xp,
    theory: e.theory,
    starterCode: e.starterCode,
    mode: e.mode,
    functionName: e.mode === "function" ? e.functionName : undefined,
    hints: e.hints || [],
    // revela apenas os argumentos de teste (não o resultado esperado),
    // para o usuário entender a assinatura sem descobrir a resposta.
    sampleArgs: e.mode === "function" ? e.testCases.map((t) => t.args) : undefined,
    expectedStdout: e.mode === "stdout" ? e.expectedStdout : undefined,
  };
}

router.get("/meta", (req, res) => {
  res.json({ languages: LANGS, difficulties: DIFFICULTIES });
});

router.get("/exercises/:language/:difficulty", (req, res) => {
  const { language, difficulty } = req.params;
  const list = exercises
    .filter((e) => e.language === language && e.difficulty === difficulty)
    .sort((a, b) => a.order - b.order)
    .map(sanitizeExercise);
  if (list.length === 0) {
    return res.status(404).json({ error: "Nenhum exercício encontrado" });
  }
  res.json(list);
});

router.get("/exercise/:id", (req, res) => {
  const e = exercises.find((x) => x.id === req.params.id);
  if (!e) return res.status(404).json({ error: "Exercício não encontrado" });
  res.json(sanitizeExercise(e));
});

router.get("/progress-map/:language", (req, res) => {
  const { language } = req.params;
  const list = exercises
    .filter((e) => e.language === language)
    .sort((a, b) => DIFFICULTIES[a.difficulty].order - DIFFICULTIES[b.difficulty].order || a.order - b.order)
    .map(sanitizeExercise);
  res.json(list);
});

router.post("/execute", async (req, res) => {
  const { exerciseId, code } = req.body || {};
  if (!exerciseId || typeof code !== "string") {
    return res.status(400).json({ error: "Requisição inválida" });
  }
  try {
    const result = await executeSubmission(exerciseId, code);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Erro ao executar código" });
  }
});

module.exports = router;

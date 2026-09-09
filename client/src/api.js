const BASE = `${import.meta.env.VITE_API_URL || ""}/api`;

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Erro ${res.status}`);
  }
  return data;
}

export function getMeta() {
  return request("/meta");
}

export function getExercises(language, difficulty) {
  return request(`/exercises/${language}/${difficulty}`);
}

export function getExercise(id) {
  return request(`/exercise/${id}`);
}

export function executeCode(exerciseId, code) {
  return request("/execute", {
    method: "POST",
    body: JSON.stringify({ exerciseId, code }),
  });
}

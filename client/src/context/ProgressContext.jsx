import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const ProgressContext = createContext(null);
const STORAGE_KEY = "pd_progress_v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { xp: 0, completed: {}, nickname: "" };
    const parsed = JSON.parse(raw);
    return { xp: 0, completed: {}, nickname: "", ...parsed };
  } catch {
    return { xp: 0, completed: {}, nickname: "" };
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors (e.g. private mode)
    }
  }, [state]);

  const completeExercise = useCallback((exerciseId, xp) => {
    let wasNew = false;
    setState((prev) => {
      if (prev.completed[exerciseId]) return prev;
      wasNew = true;
      return {
        ...prev,
        xp: prev.xp + xp,
        completed: { ...prev.completed, [exerciseId]: true },
      };
    });
    return wasNew;
  }, []);

  const setNickname = useCallback((nickname) => {
    setState((prev) => ({ ...prev, nickname }));
  }, []);

  const isCompleted = useCallback(
    (exerciseId) => Boolean(state.completed[exerciseId]),
    [state.completed]
  );

  const level = Math.floor(state.xp / 100) + 1;
  const xpIntoLevel = state.xp % 100;

  const value = useMemo(
    () => ({
      xp: state.xp,
      nickname: state.nickname,
      level,
      xpIntoLevel,
      completeExercise,
      isCompleted,
      setNickname,
      completedCount: Object.keys(state.completed).length,
    }),
    [state, level, xpIntoLevel, completeExercise, isCompleted, setNickname]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress deve ser usado dentro de ProgressProvider");
  return ctx;
}

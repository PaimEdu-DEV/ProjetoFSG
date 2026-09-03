import { useProgress } from "../context/ProgressContext";

export default function XpBadge() {
  const { xp, level, xpIntoLevel } = useProgress();
  return (
    <div className="flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-full pl-1 pr-3 py-1">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-xs font-bold text-white shrink-0">
        {level}
      </div>
      <div className="flex flex-col w-24">
        <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-500"
            style={{ width: `${xpIntoLevel}%` }}
          />
        </div>
        <span className="text-[10px] text-[var(--muted)] mt-0.5">{xp} XP</span>
      </div>
    </div>
  );
}

import { Link, useParams } from "react-router-dom";
import { useMeta } from "../hooks/useMeta";

const ORDER = ["iniciante", "intermediario", "avancado"];
const DESCRIPTIONS = {
  iniciante: "Variáveis, condicionais e sua primeira saída na tela.",
  intermediario: "Laços de repetição, listas/arrays e manipulação de strings.",
  avancado: "Recursão, estruturas de dados e algoritmos clássicos.",
};
const ICONS = { iniciante: "🌱", intermediario: "🔥", avancado: "🚀" };

export default function LearnDifficultySelect() {
  const { language } = useParams();
  const meta = useMeta();
  const lang = meta?.languages?.[language];

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        {lang && (
          <div className="text-4xl mb-2">{lang.icon}</div>
        )}
        <h1 className="text-3xl font-extrabold">
          {lang ? lang.label : "..."} — escolha a dificuldade
        </h1>
        <p className="text-[var(--muted)] mt-2">
          Cada nível tem 3 exercícios com teoria e prática.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {ORDER.map((key, i) => {
          const diff = meta?.difficulties?.[key];
          return (
            <Link
              key={key}
              to={`/aprender/${language}/${key}`}
              className="animate-float-in rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:-translate-y-1 hover:border-[var(--accent)] transition-all"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3">{ICONS[key]}</div>
              <h2 className="text-lg font-bold">{diff ? diff.label : key}</h2>
              <p className="text-[var(--muted)] text-sm mt-2">{DESCRIPTIONS[key]}</p>
              <p className="text-xs text-[var(--accent-2)] mt-3">
                +{diff ? diff.xpBase : "?"} XP por exercício
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

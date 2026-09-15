import { Link, useParams } from "react-router-dom";
import { useMeta } from "../hooks/useMeta";
import { RevealGroup, RevealItem } from "../components/Reveal";

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
        {lang && <div className="text-4xl mb-2">{lang.icon}</div>}
        <h1 className="font-display font-semibold text-3xl tracking-tight">
          {lang ? lang.label : "..."} — escolha a dificuldade
        </h1>
        <p className="text-[var(--muted)] mt-2">
          Cada nível tem 3 exercícios com teoria e prática.
        </p>
      </div>

      <RevealGroup className="grid sm:grid-cols-3 gap-5">
        {ORDER.map((key) => {
          const diff = meta?.difficulties?.[key];
          return (
            <RevealItem key={key}>
              <Link
                to={`/aprender/${language}/${key}`}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                <div className="text-3xl mb-3">{ICONS[key]}</div>
                <h2 className="text-lg font-bold">{diff ? diff.label : key}</h2>
                <p className="text-[var(--muted)] text-sm mt-2">{DESCRIPTIONS[key]}</p>
                <p className="text-xs text-[var(--accent-2)] font-semibold mt-3">
                  +{diff ? diff.xpBase : "?"} XP por exercício
                </p>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}

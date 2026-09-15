import { Link } from "react-router-dom";
import { useMeta } from "../hooks/useMeta";
import { RevealGroup, RevealItem } from "../components/Reveal";

const ORDER = ["python", "javascript", "csharp"];

export default function LearnLanguageSelect() {
  const meta = useMeta();

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="font-display font-semibold text-3xl tracking-tight">Escolha uma linguagem</h1>
        <p className="text-[var(--muted)] mt-2">
          Cada linguagem tem 3 níveis de dificuldade e desafios práticos.
        </p>
      </div>

      {!meta ? (
        <div className="grid sm:grid-cols-3 gap-5">
          {ORDER.map((k) => (
            <div key={k} className="h-44 rounded-2xl shimmer border border-[var(--border)]" />
          ))}
        </div>
      ) : (
        <RevealGroup className="grid sm:grid-cols-3 gap-5">
          {ORDER.map((key) => {
            const lang = meta.languages[key];
            return (
              <RevealItem key={key}>
                <Link
                  to={`/aprender/${key}`}
                  className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center transition-all hover:-translate-y-1"
                  style={{ "--lang-color": lang.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = lang.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                >
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-105"
                    style={{ background: `${lang.color}18`, border: `1px solid ${lang.color}40` }}
                  >
                    {lang.icon}
                  </div>
                  <h2 className="text-xl font-bold">{lang.label}</h2>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      )}
    </div>
  );
}

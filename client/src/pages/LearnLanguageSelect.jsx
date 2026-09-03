import { Link } from "react-router-dom";
import { useMeta } from "../hooks/useMeta";

const ORDER = ["python", "javascript", "csharp"];

export default function LearnLanguageSelect() {
  const meta = useMeta();

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Escolha uma linguagem</h1>
        <p className="text-[var(--muted)] mt-2">
          Cada linguagem tem 3 níveis de dificuldade e desafios práticos.
        </p>
      </div>

      {!meta ? (
        <div className="grid sm:grid-cols-3 gap-6">
          {ORDER.map((k) => (
            <div key={k} className="h-44 rounded-2xl shimmer border border-[var(--border)]" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-6">
          {ORDER.map((key, i) => {
            const lang = meta.languages[key];
            return (
              <Link
                key={key}
                to={`/aprender/${key}`}
                className="animate-float-in rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center hover:-translate-y-1 transition-transform"
                style={{ animationDelay: `${i * 80}ms`, borderColor: undefined }}
              >
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ background: `${lang.color}22`, border: `1px solid ${lang.color}55` }}
                >
                  {lang.icon}
                </div>
                <h2 className="text-xl font-bold">{lang.label}</h2>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

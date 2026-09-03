import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

export default function Home() {
  const { completedCount } = useProgress();

  return (
    <div className="flex flex-col items-center text-center gap-10 py-8">
      <div className="animate-float-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Aprenda a <span className="text-[var(--accent)]">programar</span>
          <br />
          jogando de verdade
        </h1>
        <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
          Escolha entre Python, JavaScript e C#, resolva desafios direto no navegador
          e desafie seus amigos em duelos de código ao vivo.
        </p>
        {completedCount > 0 && (
          <p className="mt-2 text-sm text-[var(--accent-2)]">
            Você já concluiu {completedCount} exercício{completedCount === 1 ? "" : "s"} 🎉
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <Link
          to="/aprender"
          className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-left overflow-hidden hover:border-[var(--accent)] transition-all hover:-translate-y-1"
        >
          <div className="absolute -right-6 -top-6 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
            📘
          </div>
          <h2 className="text-2xl font-bold mb-2">Modo Aprendizado</h2>
          <p className="text-[var(--muted)] text-sm">
            Teoria + exercícios práticos com 3 níveis de dificuldade para cada linguagem.
            Ganhe XP e suba de nível a cada desafio resolvido.
          </p>
          <span className="inline-block mt-4 text-[var(--accent)] font-semibold text-sm">
            Começar a aprender →
          </span>
        </Link>

        <Link
          to="/competitivo"
          className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-left overflow-hidden hover:border-[var(--accent-2)] transition-all hover:-translate-y-1"
        >
          <div className="absolute -right-6 -top-6 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
            ⚔️
          </div>
          <h2 className="text-2xl font-bold mb-2">Modo Competitivo</h2>
          <p className="text-[var(--muted)] text-sm">
            Crie uma sala X1, envie o código para um amigo e resolvam os mesmos
            desafios em tempo real. Quem terminar primeiro, vence!
          </p>
          <span className="inline-block mt-4 text-[var(--accent-2)] font-semibold text-sm">
            Entrar na arena →
          </span>
        </Link>
      </div>
    </div>
  );
}

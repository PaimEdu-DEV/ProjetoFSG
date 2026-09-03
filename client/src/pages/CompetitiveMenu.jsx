import { Link } from "react-router-dom";

export default function CompetitiveMenu() {
  return (
    <div className="flex flex-col items-center gap-10 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Modo Competitivo — X1</h1>
        <p className="text-[var(--muted)] mt-2 max-w-lg mx-auto">
          Desafie um amigo para resolver os mesmos exercícios ao mesmo tempo.
          Quem terminar tudo primeiro, vence!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
          to="/competitivo/criar"
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center hover:-translate-y-1 hover:border-[var(--accent)] transition-all"
        >
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-xl font-bold mb-2">Criar X1</h2>
          <p className="text-sm text-[var(--muted)]">
            Escolha a linguagem e dificuldade, gere um código e envie para um amigo.
          </p>
        </Link>

        <Link
          to="/competitivo/entrar"
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center hover:-translate-y-1 hover:border-[var(--accent-2)] transition-all"
        >
          <div className="text-5xl mb-4">🔑</div>
          <h2 className="text-xl font-bold mb-2">Entrar em um X1</h2>
          <p className="text-sm text-[var(--muted)]">
            Já tem um código de um amigo? Digite aqui e entrem na arena juntos.
          </p>
        </Link>
      </div>
    </div>
  );
}

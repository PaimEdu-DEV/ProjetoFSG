import { Link } from "react-router-dom";
import { Shield, KeyRound } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal";

export default function CompetitiveMenu() {
  return (
    <div className="flex flex-col items-center gap-10 py-6">
      <Reveal className="text-center">
        <h1 className="font-display font-semibold text-3xl tracking-tight">Modo Competitivo — X1</h1>
        <p className="text-[var(--muted)] mt-2 max-w-lg mx-auto">
          Desafie um amigo para resolver os mesmos exercícios ao mesmo tempo.
          Quem terminar tudo primeiro, vence!
        </p>
      </Reveal>

      <RevealGroup className="grid sm:grid-cols-2 gap-5 w-full max-w-2xl">
        <RevealItem>
          <Link
            to="/competitivo/criar"
            className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center transition-all hover:-translate-y-1 hover:border-[var(--accent)]"
          >
            <Shield size={32} className="mx-auto mb-4 text-[var(--accent)]" strokeWidth={1.5} />
            <h2 className="text-xl font-bold mb-2">Criar X1</h2>
            <p className="text-sm text-[var(--muted)]">
              Escolha a linguagem e dificuldade, gere um código e envie para um amigo.
            </p>
          </Link>
        </RevealItem>

        <RevealItem>
          <Link
            to="/competitivo/entrar"
            className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center transition-all hover:-translate-y-1 hover:border-[var(--accent-2)]"
          >
            <KeyRound size={32} className="mx-auto mb-4 text-[var(--accent-2)]" strokeWidth={1.5} />
            <h2 className="text-xl font-bold mb-2">Entrar em um X1</h2>
            <p className="text-sm text-[var(--muted)]">
              Já tem um código de um amigo? Digite aqui e entrem na arena juntos.
            </p>
          </Link>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}

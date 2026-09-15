import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMeta } from "../hooks/useMeta";
import { useProgress } from "../context/ProgressContext";
import { getSocket } from "../socket";
import Reveal from "../components/Reveal";

const LANG_ORDER = ["python", "javascript", "csharp"];
const DIFF_ORDER = ["iniciante", "intermediario", "avancado"];

export default function CompetitiveCreate() {
  const meta = useMeta();
  const { nickname: savedNickname, setNickname: saveNickname } = useProgress();
  const navigate = useNavigate();

  const [nickname, setNicknameLocal] = useState(savedNickname || "");
  const [language, setLanguage] = useState("python");
  const [difficulty, setDifficulty] = useState("iniciante");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleCreate(e) {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("Escolha um apelido primeiro.");
      return;
    }
    setLoading(true);
    setError(null);
    saveNickname(nickname.trim());
    getSocket().emit(
      "x1:create",
      { nickname: nickname.trim(), language, difficulty },
      (res) => {
        setLoading(false);
        if (!res.ok) {
          setError(res.error);
          return;
        }
        sessionStorage.setItem(
          "pd_x1",
          JSON.stringify({
            code: res.room.code,
            nickname: nickname.trim(),
            isHost: true,
            room: res.room,
          })
        );
        navigate(`/competitivo/sala/${res.room.code}`);
      }
    );
  }

  return (
    <Reveal as="form" onSubmit={handleCreate} className="max-w-xl mx-auto flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-display font-semibold text-3xl tracking-tight">Criar X1</h1>
        <p className="text-[var(--muted)] mt-2">Configure a sala e gere o código para seu amigo.</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--muted)]">Seu apelido</label>
        <input
          value={nickname}
          onChange={(e) => setNicknameLocal(e.target.value)}
          maxLength={20}
          placeholder="ex: NeoCoder"
          className="mt-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--muted)]">Linguagem</label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {LANG_ORDER.map((key) => {
            const lang = meta?.languages?.[key];
            const active = language === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setLanguage(key)}
                className={`rounded-xl border p-4 text-center transition-all ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)]"
                }`}
              >
                <div className="text-2xl">{lang?.icon}</div>
                <div className="text-xs mt-1">{lang?.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--muted)]">Dificuldade</label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {DIFF_ORDER.map((key) => {
            const diff = meta?.difficulties?.[key];
            const active = difficulty === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setDifficulty(key)}
                className={`rounded-xl border p-4 text-center transition-all ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)]"
                }`}
              >
                <div className="text-xs">{diff?.label || key}</div>
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="text-[var(--danger)] text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--accent)] hover:brightness-110 disabled:opacity-50 text-white font-semibold rounded-xl py-3.5 transition-all"
      >
        {loading ? "Criando sala…" : "Criar sala e gerar código"}
      </button>
    </Reveal>
  );
}

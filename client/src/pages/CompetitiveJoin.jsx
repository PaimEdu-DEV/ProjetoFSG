import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { getSocket } from "../socket";

export default function CompetitiveJoin() {
  const { nickname: savedNickname, setNickname: saveNickname } = useProgress();
  const navigate = useNavigate();

  const [nickname, setNicknameLocal] = useState(savedNickname || "");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleJoin(e) {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("Escolha um apelido primeiro.");
      return;
    }
    if (!code.trim()) {
      setError("Digite o código da sala.");
      return;
    }
    setLoading(true);
    setError(null);
    saveNickname(nickname.trim());
    const cleanCode = code.trim().toUpperCase();
    getSocket().emit(
      "x1:join",
      { nickname: nickname.trim(), code: cleanCode },
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
            isHost: false,
            room: res.room,
          })
        );
        navigate(`/competitivo/sala/${res.room.code}`);
      }
    );
  }

  return (
    <form onSubmit={handleJoin} className="max-w-md mx-auto flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Entrar em um X1</h1>
        <p className="text-[var(--muted)] mt-2">Peça o código de 5 caracteres para seu amigo.</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--muted)]">Seu apelido</label>
        <input
          value={nickname}
          onChange={(e) => setNicknameLocal(e.target.value)}
          maxLength={20}
          placeholder="ex: PyMaster"
          className="mt-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--muted)]">Código da sala</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={5}
          placeholder="ex: 7XQ2P"
          className="mt-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-center text-2xl tracking-[0.3em] font-mono-code font-bold outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {error && <p className="text-[var(--danger)] text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--accent-2)] hover:brightness-110 disabled:opacity-50 text-[var(--bg)] font-semibold rounded-xl py-3.5 transition-all"
      >
        {loading ? "Entrando…" : "Entrar na sala"}
      </button>
    </form>
  );
}

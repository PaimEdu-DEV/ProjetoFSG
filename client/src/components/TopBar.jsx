import { Link, useNavigate, useLocation } from "react-router-dom";
import XpBadge from "./XpBadge";

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-[var(--bg)]/80 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center text-[var(--muted)]"
              aria-label="Voltar"
            >
              ←
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">⚡</span>
            <span className="hidden sm:inline">Programação Didática</span>
          </Link>
        </div>
        <XpBadge />
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import logoMark from "../../assets/devcore-logo.png";

export default function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-3">
          <img src={logoMark} alt="DevCore" className="h-5 w-auto object-contain" />
          <p className="text-xs text-[var(--muted)] max-w-xs text-center sm:text-left">
            Aprenda a programar de verdade — exercícios práticos e duelos de código ao vivo.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link to="/aprender" className="hover:text-[var(--text)] transition-colors">
            Modo Aprendizado
          </Link>
          <Link to="/competitivo" className="hover:text-[var(--text)] transition-colors">
            Modo 1x1
          </Link>
        </div>

        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} DevCore
        </p>
      </div>
    </footer>
  );
}

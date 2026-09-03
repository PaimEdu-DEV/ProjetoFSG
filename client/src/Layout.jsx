import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

export default function Layout() {
  return (
    <div className="min-h-full flex flex-col">
      <TopBar />
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </div>
      <footer className="text-center text-xs text-[var(--muted)] py-6">
        Programação Didática — aprenda Python, JavaScript e C# jogando.
      </footer>
    </div>
  );
}

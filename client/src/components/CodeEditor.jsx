import Editor from "@monaco-editor/react";

const MONACO_LANG = {
  python: "python",
  javascript: "javascript",
  csharp: "csharp",
};

export default function CodeEditor({ language, value, onChange, height = "360px" }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <span className="w-3 h-3 rounded-full bg-[#f0475a]" />
        <span className="w-3 h-3 rounded-full bg-[#f5a623]" />
        <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
        <span className="ml-2 text-xs text-[var(--muted)] font-mono-code">
          editor.{language === "csharp" ? "cs" : language === "python" ? "py" : "js"}
        </span>
      </div>
      <Editor
        height={height}
        theme="vs-dark"
        language={MONACO_LANG[language] || "javascript"}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12 },
          tabSize: 4,
        }}
      />
    </div>
  );
}

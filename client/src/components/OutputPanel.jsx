function formatValue(v) {
  if (v === null || v === undefined) return "—";
  return JSON.stringify(v);
}

export default function OutputPanel({ result, running }) {
  if (running) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono-code text-sm text-[var(--muted)] flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
        Executando código…
      </div>
    );
  }
  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 p-4 font-mono-code text-sm text-[var(--muted)]">
        Clique em "Executar" para rodar seus testes.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden animate-float-in">
      <div
        className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 ${
          result.success
            ? "bg-[var(--success)]/15 text-[var(--success)]"
            : "bg-[var(--danger)]/15 text-[var(--danger)]"
        }`}
      >
        {result.success ? "✅ Todos os testes passaram!" : "❌ Ainda não está certo"}
        {result.timedOut && " — tempo limite excedido"}
      </div>
      <div className="p-4 space-y-2 font-mono-code text-sm max-h-72 overflow-y-auto">
        {result.testResults?.map((t, i) => (
          <div
            key={i}
            className={`rounded-lg border px-3 py-2 ${
              t.passed
                ? "border-[var(--success)]/40 bg-[var(--success)]/5"
                : "border-[var(--danger)]/40 bg-[var(--danger)]/5"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>
                {t.passed ? "✔" : "✘"} {t.description}
              </span>
            </div>
            {!t.passed && (
              <div className="mt-1 text-xs text-[var(--muted)] space-y-0.5">
                <div>
                  esperado: <span className="text-[var(--text)]">{formatValue(t.expected)}</span>
                </div>
                <div>
                  obtido:{" "}
                  <span className="text-[var(--text)]">
                    {t.error ? t.error : formatValue(t.actual)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        {result.stderr ? (
          <pre className="text-[var(--danger)] whitespace-pre-wrap text-xs mt-2">
            {result.stderr}
          </pre>
        ) : null}
      </div>
    </div>
  );
}

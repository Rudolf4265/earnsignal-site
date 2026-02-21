import type { Warning } from "@/lib/contracts/diagnostic";

export function WarningsPanel({ warnings }: { warnings: Warning[] }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Warnings</h2>
      {warnings.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No data-quality warnings reported.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {warnings.map((warning) => (
            <li key={warning.code} className="rounded-lg border border-border bg-slate-50 p-3 text-sm">
              <p className="font-medium">{warning.code}</p>
              <p className="text-muted">{warning.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

import type { InputsSummary as InputsSummaryType } from "@/lib/contracts/diagnostic";

export function InputsSummary({ inputs }: { inputs: InputsSummaryType }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Inputs Summary</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Cell label="Months present" value={inputs.months_present.toString()} />
        <Cell label="Months missing" value={inputs.months_missing.toString()} />
        <Cell label="Rows consumed" value={inputs.rows_consumed?.toString() ?? "—"} />
      </div>
      {inputs.notes?.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          {inputs.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

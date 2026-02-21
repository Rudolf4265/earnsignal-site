import type { MilestoneGameplanSection as MilestoneGameplanSectionType } from "@/lib/contracts/diagnostic";

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

export function MilestoneGameplan({ section }: { section: MilestoneGameplanSectionType }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Milestone Gameplan</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Cell label="Current MRR" value={money(section.current_mrr_cents)} />
        <Cell label="Target MRR" value={money(section.target_mrr_cents)} />
        <Cell label="Net New Subs Needed" value={section.net_new_subs_needed.toString()} />
        <Cell label="Gross New Subs Needed" value={section.gross_new_subs_needed.toString()} />
      </div>
      <p className="mt-4 text-sm text-muted">{section.explanation}</p>
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

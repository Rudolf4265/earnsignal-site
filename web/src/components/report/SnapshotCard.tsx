import type { Period, SnapshotSection } from "@/lib/contracts/diagnostic";

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

const pct = (value: number) => `${value.toFixed(1)}%`;

export function SnapshotCard({ snapshot, period }: { snapshot: SnapshotSection; period: Period }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Snapshot</h2>
      <p className="mt-1 text-sm text-muted">
        Coverage: {period.start_month} to {period.end_month} ({period.months_included} months)
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Current MRR" value={money(snapshot.mrr_current_cents)} />
        <Metric label="3-Month Trend" value={pct(snapshot.mrr_trend_3mo_pct)} />
        <Metric label="Active Subscribers" value={snapshot.active_subs_current.toLocaleString()} />
        <Metric label="ARPU" value={money(snapshot.arpu_cents)} />
        <Metric label="Monthly Churn" value={pct(snapshot.monthly_churn_rate_pct)} />
        <Metric label="Stage" value={snapshot.stage.replace(/_/g, " ")} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

import type { GrowthRetentionSection, MonthlyPoint } from "@/lib/contracts/diagnostic";

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

export function GrowthRetention({ section }: { section: GrowthRetentionSection }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Growth & Retention</h2>
      <p className="mt-2 text-sm text-muted">{section.narrative}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SparklineCard title="MRR trend" series={section.mrr_series} />
        <SparklineCard title="Churn rate" series={section.churn_rate_series_pct} />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-4">Month</th><th className="py-2 pr-4">MRR</th><th className="py-2 pr-4">Active</th><th className="py-2 pr-4">New</th><th className="py-2 pr-4">Cancelled</th><th className="py-2 pr-4">Net</th><th className="py-2">Churn</th>
            </tr>
          </thead>
          <tbody>
            {section.summary_table.map((row) => (
              <tr key={row.month} className="border-b border-border/70">
                <td className="py-2 pr-4">{row.month}</td>
                <td className="py-2 pr-4">{money(row.mrr_cents)}</td>
                <td className="py-2 pr-4">{row.active_subs}</td>
                <td className="py-2 pr-4">{row.new_subs}</td>
                <td className="py-2 pr-4">{row.cancelled_subs}</td>
                <td className="py-2 pr-4">{row.net_subs_change}</td>
                <td className="py-2">{row.churn_rate_pct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SparklineCard({ title, series }: { title: string; series: MonthlyPoint[] }) {
  const min = Math.min(...series.map((s) => s.value));
  const max = Math.max(...series.map((s) => s.value));
  const bars = series.map((s) => ({
    month: s.month,
    height: max === min ? 50 : 20 + ((s.value - min) / (max - min)) * 80,
  }));

  return (
    <div className="rounded-lg border border-border bg-slate-50 p-3">
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-3 flex h-24 items-end gap-1">
        {bars.map((bar) => (
          <div key={bar.month} className="flex-1 rounded-t bg-accent/70" style={{ height: `${bar.height}%` }} title={bar.month} />
        ))}
      </div>
    </div>
  );
}

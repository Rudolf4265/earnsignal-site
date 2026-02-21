import type { ExecutiveSummarySection } from "@/lib/contracts/diagnostic";

export function ExecutiveSummary({ section }: { section: ExecutiveSummarySection }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Executive Summary</h2>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <Badge label={`Lever: ${section.primary_growth_lever}`} />
        <Badge label={`Momentum: ${section.momentum}`} />
        <Badge label={`Confidence: ${section.confidence}`} />
      </div>
      <ul className="mt-4 space-y-3">
        {section.top_insights.map((insight) => (
          <li key={insight.code} className="rounded-lg border border-border p-3">
            <p className="text-sm font-medium">{insight.title}</p>
            <p className="mt-1 text-sm text-muted">{insight.detail}</p>
            <p className="mt-2 text-xs text-muted">Severity: {insight.severity}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="rounded-full border border-border bg-slate-50 px-3 py-1">{label}</span>;
}

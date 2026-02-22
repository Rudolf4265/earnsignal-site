import { DataQualityBadge, KpiCard, ReportCard } from "@/components/app/components";
import { loadReports, requireAuth } from "@/app/app/data";

export default async function ReportsPage() {
  const { supabase } = await requireAuth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { reports, demoMode } = await loadReports(session?.access_token ?? "");

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-600">Weekly performance briefings across your connected platforms.</p>
        </div>
        {demoMode ? <DataQualityBadge demoMode /> : null}
      </header>

      <section className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="text-sm text-slate-600">Platform filter</label>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>All platforms</option>
          <option>Patreon</option>
          <option>Substack</option>
          <option>YouTube CSV</option>
          <option>Instagram CSV</option>
          <option>TikTok CSV</option>
          <option>OnlyFans CSV</option>
        </select>
        <label className="ml-2 text-sm text-slate-600">Sort</label>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Newest first</option>
        </select>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Net Revenue" value={reports.reports[0]?.netRevenue ?? "$0"} />
        <KpiCard label="Subscribers" value={reports.reports[0]?.subscribers ?? "0"} />
        <KpiCard label="Churn Risk" value={reports.reports[0]?.churnRisk ?? "0%"} />
      </section>

      <section className="grid gap-4">
        {reports.reports.map((report: any) => (
          <ReportCard key={report.id} id={report.id} title={report.title} platforms={report.platforms} status={report.status} topSignal={report.topSignal} />
        ))}
      </section>
    </div>
  );
}

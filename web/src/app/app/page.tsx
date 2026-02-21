import { ActionItem, DataQualityBadge, KpiCard, SignalItem } from "@/components/app/components";
import { loadDashboard, requireAuth } from "./data";

export default async function DashboardPage() {
  const { supabase } = await requireAuth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { dashboard, demoMode } = await loadDashboard(session?.access_token ?? "");

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600">Executive snapshot for your revenue system.</p>
        </div>
        {demoMode ? <DataQualityBadge demoMode /> : null}
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {dashboard.kpis.slice(0, 3).map((kpi: any) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Key Signals</h2>
          <ul className="mt-4 grid gap-3">
            {dashboard.keySignals.map((signal: any) => (
              <SignalItem key={signal.title} title={signal.title} description={signal.description} />
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Strategic Actions</h2>
          <ul className="mt-4 grid gap-3">
            {dashboard.strategicActions.map((action: any) => (
              <ActionItem key={action.title} title={action.title} detail={`Impact: ${action.expectedImpact} · Effort: ${action.effort}`} />
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Revenue Trend</h2>
          <div className="mt-4 flex items-end gap-2">
            {dashboard.revenueSeries.map((point: any) => (
              <div key={point.period} className="flex-1">
                <div className="rounded-t bg-teal-500" style={{ height: `${point.value * 2}px` }} />
                <p className="mt-1 text-center text-xs text-slate-500">{point.period}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Platform Mix</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {dashboard.platformMix.map((platform: any) => (
              <li key={platform.platform} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                <span>{platform.platform}</span>
                <span>{platform.percent}% · {platform.revenue}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Uploads Summary</h2>
        <p className="mt-2 text-sm text-slate-600">{dashboard.uploads.files} files · coverage {dashboard.uploads.coverage} · {dashboard.uploads.summary}</p>
      </article>
    </div>
  );
}

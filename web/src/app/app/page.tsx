import { ActionItem, DataQualityBadge, KpiCard, SignalItem } from "@/components/app/components";
import { apiFetch } from "@/lib/api";
import { getAuthFromCookies } from "@/lib/supabase";

export default async function DashboardPage() {
  const auth = await getAuthFromCookies();
  const result = await apiFetch<{
    kpis: Array<{ label: string; value: string; delta: string }>;
    keySignals: string[];
    strategicActions: string[];
    revenueSeries: Array<{ month: string; value: number }>;
    platformMix: Array<{ platform: string; share: number }>;
    uploads: { files: number; lastSync: string; coverage: string };
  }>("/dashboard", auth?.accessToken ?? "");

  const data = result.data;

  return (
    <div className="grid gap-6">
      {result.error ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">API unreachable: {result.error}</div> : null}
      {result.demoMode ? <DataQualityBadge demoMode /> : null}
      <section className="grid gap-4 md:grid-cols-3">{data.kpis?.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}</section>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold">Key Signals</h2><ul className="mt-4 grid gap-3">{data.keySignals?.map((signal) => <SignalItem key={signal} text={signal} />)}</ul></article>
        <article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold">Strategic Actions</h2><ul className="mt-4 grid gap-3">{data.strategicActions?.map((action) => <ActionItem key={action} text={action} />)}</ul></article>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold">Revenue Trend</h2><div className="mt-4 flex items-end gap-3">{data.revenueSeries?.map((point) => <div key={point.month} className="flex-1"><div className="rounded-t bg-teal-500" style={{ height: `${point.value * 2}px` }} /><p className="mt-2 text-center text-xs text-slate-500">{point.month}</p></div>)}</div></article>
        <article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold">Platform Mix</h2><ul className="mt-4 space-y-2">{data.platformMix?.map((p) => <li key={p.platform} className="text-sm text-slate-700">{p.platform}: {p.share}%</li>)}</ul></article>
      </section>
      <article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold">Uploaded Files</h2><p className="mt-2 text-sm text-slate-600">{data.uploads?.files} files synced · {data.uploads?.lastSync} · Coverage {data.uploads?.coverage}</p></article>
    </div>
  );
}

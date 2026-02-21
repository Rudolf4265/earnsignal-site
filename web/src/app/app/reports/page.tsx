import { DataQualityBadge, ReportCard } from "@/components/app/components";
import { apiFetch } from "@/lib/api";
import { getAuthFromCookies } from "@/lib/supabase";

export default async function ReportsPage() {
  const auth = await getAuthFromCookies();
  const result = await apiFetch<{
    kpiStrip: Array<{ label: string; value: string }>;
    reports: Array<{ id: string; title: string; status: "Ready" | "Needs Attention" | "Processing"; period: string }>;
  }>("/reports", auth?.accessToken ?? "");

  return (
    <div className="grid gap-6">
      {result.demoMode ? <DataQualityBadge demoMode /> : null}
      <section className="grid gap-4 md:grid-cols-3">
        {result.data.kpiStrip?.map((kpi) => (
          <article key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{kpi.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{kpi.value}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-4">
        {result.data.reports?.map((report) => (
          <ReportCard key={report.id} {...report} />
        ))}
      </section>
    </div>
  );
}

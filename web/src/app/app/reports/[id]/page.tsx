import { DataQualityBadge, SectionRail } from "@/components/app/components";
import { loadReportDetail, requireAuth } from "@/app/app/data";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAuth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { report, demoMode } = await loadReportDetail(session?.access_token ?? "", id);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
      <div className="grid gap-4">
        <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{report.generatedAt}</p>
              <h1 className="text-2xl font-semibold text-slate-900">{report.title}</h1>
              <p className="mt-1 text-sm text-slate-600">{report.platforms.join(" • ")}</p>
            </div>
            <div className="flex items-center gap-2">
              {demoMode ? <DataQualityBadge demoMode /> : null}
              <button disabled className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-400">Download PDF</button>
            </div>
          </div>
        </header>

        {report.sectionsNav.map((section: any) => (
          <section id={section.id} key={section.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.label}</h2>
            <p className="mt-2 text-sm text-slate-600">{report.sections[section.id]?.body}</p>
            <div className="mt-3 h-20 rounded-lg border border-dashed border-slate-300 bg-slate-50" />
          </section>
        ))}
      </div>

      <div className="lg:sticky lg:top-6 lg:h-max">
        <SectionRail sections={report.sectionsNav} />
      </div>
    </div>
  );
}

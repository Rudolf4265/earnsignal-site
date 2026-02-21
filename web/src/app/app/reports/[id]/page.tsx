import { SectionRail } from "@/components/app/components";

const sections = [
  "Executive Summary",
  "Revenue Snapshot",
  "Audience Signals",
  "Retention Risks",
  "Strategic Actions",
];

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <SectionRail sections={sections} />
      <div className="grid gap-4">
        <header className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Report {id}</p>
              <h1 className="text-2xl font-semibold text-slate-900">Weekly Briefing</h1>
            </div>
            <button disabled className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-400">Download PDF</button>
          </div>
        </header>
        {sections.map((section) => (
          <section key={section} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold">{section}</h2>
            <div className="mt-3 h-20 rounded-lg bg-slate-100" />
          </section>
        ))}
      </div>
    </div>
  );
}

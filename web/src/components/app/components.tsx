import Link from "next/link";
import { cn } from "@/lib/utils";

export type DataQualityTone = "good" | "warning";

export function AppShell({ sidebar, topbar, children }: { sidebar: React.ReactNode; topbar: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="bg-slate-950 px-4 py-6 text-slate-100">{sidebar}</aside>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white px-6 py-4">{topbar}</header>
          <main className="flex-1 px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function KpiCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {delta ? <p className="mt-2 text-sm font-medium text-teal-700">{delta}</p> : null}
    </article>
  );
}

export function DataQualityBadge({ label, tone = "good", demoMode }: { label?: string; tone?: DataQualityTone; demoMode?: boolean }) {
  const style = demoMode
    ? "bg-amber-100 text-amber-700"
    : tone === "warning"
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

  return <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", style)}>{demoMode ? "Demo Data Mode" : label ?? "Data quality: Good"}</span>;
}

export function StatusBadge({ status }: { status: "Ready" | "Needs Attention" | "Processing" }) {
  const style = status === "Ready" ? "bg-emerald-100 text-emerald-700" : status === "Needs Attention" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-700";
  return <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", style)}>{status}</span>;
}

export function SignalItem({ title, description }: { title: string; description: string }) {
  return <li className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-sm font-medium text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-600">{description}</p></li>;
}

export function ActionItem({ title, detail }: { title: string; detail: string }) {
  return <li className="rounded-lg border border-teal-100 bg-teal-50 p-3"><p className="text-sm font-medium text-teal-900">{title}</p><p className="mt-1 text-sm text-teal-800">{detail}</p></li>;
}

export function PlatformCard({ name, enabled, suffix }: { name: string; enabled: boolean; suffix?: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{name}</h3>
        <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>{enabled ? "Enabled" : "Soon"}</span>
      </div>
      {suffix ? <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{suffix}</p> : null}
    </article>
  );
}

export function Stepper({ steps }: { steps: string[] }) {
  return <ol className="grid gap-2 md:grid-cols-4">{steps.map((step, i) => <li key={step} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm"><span className="mr-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">{i + 1}</span>{step}</li>)}</ol>;
}

export function ReportCard({ id, title, platforms, status, topSignal }: { id: string; title: string; platforms: string[]; status: "Ready" | "Needs Attention" | "Processing"; topSignal: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{platforms.join(" • ")}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <p className="mt-3 text-sm text-slate-700">Top signal: {topSignal}</p>
      <Link href={`/app/reports/${id}`} className="mt-4 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Open briefing</Link>
    </article>
  );
}

export function SectionRail({ sections }: { sections: Array<{ id: string; label: string }> }) {
  return <nav className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs uppercase tracking-wide text-slate-500">Sections</p><ul className="mt-3 space-y-2">{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-sm text-slate-700 hover:text-slate-900">{section.label}</a></li>)}</ul></nav>;
}

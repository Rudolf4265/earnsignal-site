import Link from "next/link";
import { ReactNode } from "react";

export function DataQualityBadge({ demoMode }: { demoMode?: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${demoMode ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
      {demoMode ? "Demo Data Mode" : "Data Quality: Good"}
    </span>
  );
}

export function StatusBadge({ status }: { status: "Ready" | "Needs Attention" | "Processing" }) {
  const tone = status === "Ready" ? "bg-emerald-100 text-emerald-700" : status === "Needs Attention" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-700";
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

export function KpiCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return <article className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p><p className="mt-2 text-sm text-teal-700">{delta}</p></article>;
}

export function SignalItem({ text }: { text: string }) { return <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{text}</li>; }
export function ActionItem({ text }: { text: string }) { return <li className="rounded-lg border border-teal-100 bg-teal-50 p-3 text-sm text-teal-900">{text}</li>; }

export function PlatformCard({ name, enabled }: { name: string; enabled: boolean }) {
  return <article className="rounded-xl border border-slate-200 bg-white p-5"><h3 className="font-semibold text-slate-900">{name}</h3><p className="mt-2 text-sm text-slate-600">{enabled ? "Available now" : "Coming soon"}</p></article>;
}

export function Stepper({ steps }: { steps: string[] }) {
  return <ol className="grid gap-2 sm:grid-cols-4">{steps.map((step, index) => <li key={step} className="rounded-lg border border-slate-200 bg-white p-3 text-sm"><span className="mr-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">{index + 1}</span>{step}</li>)}</ol>;
}

export function ReportCard({ id, title, period, status }: { id: string; title: string; period: string; status: "Ready" | "Needs Attention" | "Processing" }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-wide text-slate-500">{period}</p><h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3></div><StatusBadge status={status} /></div>
      <Link href={`/app/reports/${id}`} className="mt-4 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Open briefing</Link>
    </article>
  );
}

export function SectionRail({ sections }: { sections: string[] }) {
  return <nav className="sticky top-6 rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Sections</p><ul className="mt-3 space-y-2">{sections.map((s) => <li key={s} className="text-sm text-slate-700">{s}</li>)}</ul></nav>;
}

export function AppShell({ sidebar, topbar, children }: { sidebar: ReactNode; topbar: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[250px_1fr]">
        <aside className="bg-slate-950 px-4 py-6 text-slate-100">{sidebar}</aside>
        <div>
          <header className="border-b border-slate-200 bg-white px-6 py-4">{topbar}</header>
          <main className="px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

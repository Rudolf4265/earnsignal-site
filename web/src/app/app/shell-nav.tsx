"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DataQualityBadge } from "@/components/app/components";

const links = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/connect", label: "Connect Data" },
  { href: "/app/reports", label: "Reports" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div>
      <p className="px-2 text-lg font-semibold">EarnSignal</p>
      <p className="mt-1 px-2 text-xs text-slate-400">Financial briefing OS</p>
      <nav className="mt-6 grid gap-1">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className={`rounded-lg px-3 py-2 text-sm ${pathname === item.href ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"}`}>
            {item.label}
          </Link>
        ))}
        <span className="rounded-lg px-3 py-2 text-sm text-slate-500">Settings (disabled)</span>
      </nav>
    </div>
  );
}

export function Topbar({ email, dataQualityLabel, demoMode }: { email?: string; dataQualityLabel?: string; demoMode?: boolean }) {
  const pathname = usePathname();
  const breadcrumb = pathname.replace("/app", "").split("/").filter(Boolean).join(" / ") || "Dashboard";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Breadcrumb</p>
        <p className="text-sm font-semibold text-slate-900">{breadcrumb}</p>
      </div>
      <div className="flex items-center gap-3">
        <DataQualityBadge label={dataQualityLabel} demoMode={demoMode} />
        <button className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white">Generate Briefing</button>
        <form action="/logout" method="post">
          <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">{email ?? "Profile"} · Sign out</button>
        </form>
      </div>
    </div>
  );
}

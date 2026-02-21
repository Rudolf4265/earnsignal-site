"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/login/actions";
import { DataQualityBadge } from "@/components/app/components";

const navItems = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/connect", label: "Connect Data" },
  { href: "/app/reports", label: "Reports" },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <div>
      <p className="px-2 text-lg font-semibold">EarnSignal</p>
      <nav className="mt-6 grid gap-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`rounded-lg px-3 py-2 text-sm ${pathname === item.href ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}>
            {item.label}
          </Link>
        ))}
        <span className="rounded-lg px-3 py-2 text-sm text-slate-500">Settings (soon)</span>
      </nav>
    </div>
  );
}

export function Topbar({ email, demoMode }: { email?: string; demoMode?: boolean }) {
  const pathname = usePathname();
  const crumb = pathname.replace("/app", "").split("/").filter(Boolean).join(" / ") || "Dashboard";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Workspace</p>
        <p className="text-sm font-semibold text-slate-900">{crumb}</p>
      </div>
      <div className="flex items-center gap-3">
        <DataQualityBadge demoMode={demoMode} />
        <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">Upload Files</button>
        <form action={logoutAction}><button className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">{email ?? "Profile"} · Sign out</button></form>
      </div>
    </div>
  );
}

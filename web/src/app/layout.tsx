import type { Metadata } from "next";
import { siteEnv } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteEnv.siteUrl),
  title: {
    default: "EarnSignal — Creator Revenue Diagnostics",
    template: "%s | EarnSignal",
  },
  description: "Private diagnostics for creator pricing and revenue trends across Patreon, Substack, and other platforms.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}

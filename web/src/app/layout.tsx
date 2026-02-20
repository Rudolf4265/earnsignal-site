import type { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { siteEnv } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteEnv.siteUrl),
  title: {
    default: "EarnSignal — Creator Revenue Diagnostics",
    template: "%s | EarnSignal",
  },
  description:
    "Private diagnostics for creator pricing and revenue trends across Patreon, Substack, and other platforms.",
  openGraph: {
    title: "EarnSignal",
    description:
      "Signals behind creator revenue & pricing. Private diagnostics for Patreon, Substack, and other creator platforms.",
    type: "website",
    url: siteEnv.siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-fg antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

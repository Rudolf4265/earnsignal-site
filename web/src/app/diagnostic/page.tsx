import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { TemplateLinks } from "@/components/template-links";
import { siteEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: "Diagnostic",
  description: "Accepted platforms, required CSV inputs, and what your EarnSignal diagnostic includes.",
};

const accepted = ["Instagram", "YouTube", "TikTok", "OnlyFans", "Patreon", "Substack", "Passes"];

export default function DiagnosticPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold">Diagnostic scope</h1>
      <p className="mt-4 max-w-3xl text-muted">
        Upload your platform exports and we return a private diagnostic with pricing signal readouts, revenue trend insights,
        and testable next-step recommendations.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Accepted platforms</h2>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {accepted.map((name) => (
            <li key={name} className="rounded-full border border-border bg-white px-3 py-1">
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Inputs we need</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>Recent CSV exports for subscriptions, transactions, and plan data.</li>
          <li>At least one full month of data (three months recommended for better trend confidence).</li>
          <li>No personally identifying information required.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">CSV templates</h2>
        <div className="mt-3">
          <TemplateLinks />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Schema docs</h2>
        {siteEnv.csvDocsUrl ? (
          <a href={siteEnv.csvDocsUrl} className="mt-2 inline-block text-sm text-accent hover:underline" target="_blank" rel="noreferrer">
            Open schema docs
          </a>
        ) : (
          <p className="mt-2 text-sm text-muted">Schema docs available soon.</p>
        )}
      </section>
    </Container>
  );
}

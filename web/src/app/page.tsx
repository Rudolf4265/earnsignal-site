import { ButtonLink } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <p className="mb-3 text-sm font-medium text-accent">Private creator diagnostics</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Signals behind creator revenue & pricing
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          We run private diagnostics for Patreon, Substack, and other creator platforms so you can spot pricing gaps,
          retention patterns, and revenue opportunities.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/diagnostic">See what’s included</ButtonLink>
          <ButtonLink href="/upload" variant="secondary">
            Upload CSVs
          </ButtonLink>
        </div>
      </Container>

      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        {[
          ["1", "Share exports", "Upload platform CSV exports from your creator stack."],
          ["2", "We map and analyze", "We normalize your data and compute pricing and revenue signals."],
          ["3", "Get action steps", "You receive a concise readout with priorities and suggested tests."],
        ].map(([step, title, body]) => (
          <section key={step} className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-accent">Step {step}</p>
            <h2 className="mt-2 text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </section>
        ))}
      </Container>

      <Container className="py-10">
        <h2 className="text-2xl font-semibold">What you’ll receive</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          <li>Revenue and pricing signal summary across your provided platforms.</li>
          <li>Segment-level findings on paid conversion, churn risk, and likely upgrade opportunities.</li>
          <li>Clear recommendations you can execute this week with expected impact windows.</li>
        </ul>
      </Container>

      <Container className="py-10">
        <Callout>
          <p className="font-medium text-fg">Privacy first</p>
          <p className="mt-1">Files deleted within 7–14 days. No PII required.</p>
        </Callout>
      </Container>

      <Container className="py-10">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4">
          <section>
            <h3 className="font-medium">Which CSV exports should I upload?</h3>
            <p className="text-sm text-muted">Start with platform export CSVs for subscriptions, payouts, and plan tiers.</p>
          </section>
          <section>
            <h3 className="font-medium">How is my data handled?</h3>
            <p className="text-sm text-muted">Diagnostics are private. We only keep files for processing, then delete within 7–14 days.</p>
          </section>
          <section>
            <h3 className="font-medium">When do I get results?</h3>
            <p className="text-sm text-muted">Most diagnostics are delivered within 3–5 business days after clean upload.</p>
          </section>
        </div>
      </Container>
    </>
  );
}

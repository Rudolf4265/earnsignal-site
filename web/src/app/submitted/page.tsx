import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: "Submitted",
  description: "Confirmation page after upload interest submission.",
};

export default function SubmittedPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold">Thanks — we’ve got your request.</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Next, upload your CSVs through the secure uploader and we’ll confirm once files are reviewed.
      </p>
      <p className="mt-3 text-muted">Typical turnaround: 3–5 business days after clean upload.</p>
      <p className="mt-6 text-sm">
        Need help? <a href={`mailto:${siteEnv.supportEmail}`} className="text-accent hover:underline">{siteEnv.supportEmail}</a>
      </p>
    </Container>
  );
}

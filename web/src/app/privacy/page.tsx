import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "EarnSignal privacy policy summary.",
};

export default function PrivacyPage() {
  return (
    <Container className="prose prose-slate py-16">
      <h1>Privacy</h1>
      <p>EarnSignal diagnostics are private by default. Uploaded files are only used to produce your requested diagnostic.</p>
      <p>Files are deleted within 7–14 days of processing unless a shorter retention window is requested.</p>
      <p>No personally identifying information is required for standard diagnostics.</p>
    </Container>
  );
}

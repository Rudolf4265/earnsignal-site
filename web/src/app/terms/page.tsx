import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms",
  description: "EarnSignal terms and usage notes.",
};

export default function TermsPage() {
  return (
    <Container className="prose prose-slate py-16">
      <h1>Terms</h1>
      <p>EarnSignal provides informational diagnostics for creator businesses and does not provide legal or financial advice.</p>
      <p>By submitting data, you confirm you have rights to share the files and request analysis.</p>
      <p>Standard processing includes deletion within 7–14 days and no PII requirement for core workflows.</p>
    </Container>
  );
}

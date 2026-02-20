import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">Sorry, we couldn’t find that page.</p>
      <Link href="/" className="mt-5 inline-block text-accent hover:underline">
        Back to home
      </Link>
    </Container>
  );
}

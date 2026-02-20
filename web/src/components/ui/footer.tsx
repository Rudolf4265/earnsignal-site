import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteEnv } from "@/lib/env";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white py-8 text-sm text-muted">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-fg">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-fg">
            Terms
          </Link>
        </div>
        <a href={`mailto:${siteEnv.supportEmail}`} className="hover:text-fg">
          {siteEnv.supportEmail}
        </a>
      </Container>
    </footer>
  );
}

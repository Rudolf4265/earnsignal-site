import Link from "next/link";
import { Container } from "@/components/ui/container";

const nav = [
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/upload", label: "Upload" },
  { href: "/privacy", label: "Privacy" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold">
          EarnSignal
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm text-muted">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

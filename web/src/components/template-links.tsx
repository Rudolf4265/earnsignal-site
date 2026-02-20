import { getTemplateLinks } from "@/lib/env";

export function TemplateLinks() {
  const links = getTemplateLinks();
  const hasTemplates = links.some((item) => item.href);

  if (!hasTemplates) {
    return <p className="text-sm text-muted">Templates available soon.</p>;
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {links.map((item) => (
        <li key={item.platform}>
          <a
            href={item.href}
            className="text-sm text-accent underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Download {item.label} template
          </a>
        </li>
      ))}
    </ul>
  );
}

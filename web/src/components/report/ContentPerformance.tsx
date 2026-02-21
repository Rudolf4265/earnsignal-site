import { Callout } from "@/components/ui/callout";
import type { ContentPerformanceSection as ContentPerformanceSectionType } from "@/lib/contracts/diagnostic";

export function ContentPerformance({ section }: { section: ContentPerformanceSectionType | null }) {
  if (!section) {
    return <Callout>Content performance details were unavailable for this report.</Callout>;
  }

  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Content Performance</h2>
      <p className="mt-2 text-sm text-muted">Best converting type: {section.best_type.replace(/_/g, " ")}</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-4">Type</th><th className="py-2 pr-4">Posts</th><th className="py-2 pr-4">Views</th><th className="py-2 pr-4">Paid Signups</th><th className="py-2 pr-4">Conv.</th><th className="py-2">Upgrades</th>
            </tr>
          </thead>
          <tbody>
            {section.by_type.map((row) => (
              <tr key={row.content_type} className="border-b border-border/70">
                <td className="py-2 pr-4">{row.content_type.replace(/_/g, " ")}</td>
                <td className="py-2 pr-4">{row.posts}</td>
                <td className="py-2 pr-4">{row.views ?? "—"}</td>
                <td className="py-2 pr-4">{row.paid_signups ?? "—"}</td>
                <td className="py-2 pr-4">{row.conversion_rate_pct !== null ? `${row.conversion_rate_pct}%` : "—"}</td>
                <td className="py-2">{row.tier_upgrades ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

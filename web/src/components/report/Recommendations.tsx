import type { RecommendationsSection as RecommendationsSectionType } from "@/lib/contracts/diagnostic";

export function Recommendations({ section }: { section: RecommendationsSectionType }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">Recommendations</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {section.blocks.map((block, index) => (
          <article key={`${block.title}-${index}`} className="rounded-lg border border-border bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Priority {block.priority.toUpperCase()}</p>
            <h3 className="mt-1 font-semibold">{block.title}</h3>
            <p className="mt-2 text-sm text-muted">{block.why_it_matters}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
              {block.what_to_do.map((todo) => (
                <li key={todo}>{todo}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-medium">{block.expected_impact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { PlatformCard, Stepper } from "@/components/app/components";

export default function ConnectPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PlatformCard name="Patreon" enabled />
        <PlatformCard name="Substack" enabled />
        <PlatformCard name="YouTube" enabled={false} />
        <PlatformCard name="Shopify" enabled={false} />
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Upload workflow</h2>
        <div className="mt-4"><Stepper steps={["Download", "Upload", "Validate", "Confirm"]} /></div>
      </section>
      <section className="rounded-xl border border-teal-100 bg-teal-50 p-5">
        <h2 className="text-lg font-semibold text-teal-900">Privacy & trust</h2>
        <p className="mt-2 text-sm text-teal-800">Files are encrypted in transit and removed after briefing generation windows close.</p>
      </section>
    </div>
  );
}

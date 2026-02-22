"use client";

import { useState } from "react";
import { PlatformCard, Stepper } from "@/components/app/components";

const platforms = [
  { key: "patreon", label: "Patreon" },
  { key: "substack", label: "Substack" },
  { key: "youtube", label: "YouTube", suffix: "CSV" },
  { key: "instagram", label: "Instagram", suffix: "CSV" },
  { key: "tiktok", label: "TikTok", suffix: "CSV" },
  { key: "onlyfans", label: "OnlyFans", suffix: "CSV" },
];

export default function ConnectPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Connect Data</h1>
        <p className="text-sm text-slate-600">Upload source files from your v1 platform stack.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {platforms.map((platform) => (
          <button key={platform.key} onClick={() => setSelectedPlatform(platform)} className="text-left">
            <PlatformCard name={platform.label} suffix={platform.suffix} enabled={platform.key === "patreon" || platform.key === "substack"} />
          </button>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Upload flow · {selectedPlatform.label}</h2>
        <div className="mt-4">
          <Stepper steps={["Download", "Upload", "Validate", "Confirm"]} />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <button disabled className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-400" title="Template endpoint not yet wired in Phase A2">
            Download template (coming soon)
          </button>
          <button disabled className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-400" title="Validation endpoint not yet wired in Phase A2">
            Validate file (coming soon)
          </button>
          <button disabled className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-400" title="Ingestion endpoint integration lands in next phase">
            Generate report (disabled)
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-teal-100 bg-teal-50 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-teal-900">Your privacy</h2>
        <p className="mt-2 text-sm text-teal-800">All files are encrypted in transit. Access is limited and processing artifacts are removed after reporting windows close.</p>
      </section>
    </div>
  );
}

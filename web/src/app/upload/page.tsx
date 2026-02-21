import type { Metadata } from "next";
import { TemplateLinks } from "@/components/template-links";
import { UploadInterestForm } from "@/components/upload-interest-form";
import { Button, ButtonLink } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { siteEnv } from "@/lib/env";
import { DiagnosticsGenerateForm } from "./diagnostics-generate-form";

export const metadata: Metadata = {
  title: "Upload",
  description: "Upload handoff for EarnSignal diagnostics with secure uploader link and email confirmation.",
};

export default function UploadPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold">Upload handoff</h1>
      <p className="mt-3 max-w-2xl text-muted">Use the secure uploader link for file transfer, then we confirm intake by email.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {siteEnv.streamlitUploaderUrl ? (
          <ButtonLink href={siteEnv.streamlitUploaderUrl} target="_blank" rel="noreferrer">
            Open Secure Uploader
          </ButtonLink>
        ) : (
          <span className="inline-flex h-10 items-center rounded-md border border-border bg-slate-100 px-4 text-sm text-muted">
            Secure uploader coming soon
          </span>
        )}
      </div>

      {siteEnv.diagnosticsUploadEnabled ? (
        <DiagnosticsGenerateForm />
      ) : (
        <section className="mt-10 rounded-xl border border-border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Coming next</h2>
          <p className="mt-2 text-sm text-muted">
            v1 uses the Streamlit uploader for secure intake. In vNext, this page will generate your full diagnostic report directly in-app.
          </p>
          <div className="mt-4">
            <Button disabled className="cursor-not-allowed opacity-60">
              Generate report (coming soon)
            </Button>
          </div>
        </section>
      )}

      <UploadInterestForm />

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Download templates</h2>
        <div className="mt-3">
          <TemplateLinks />
        </div>
      </section>

      <Callout className="mt-10">
        <p className="font-medium text-fg">Trust notes</p>
        <p className="mt-1">No spam, transactional updates only. Files are used only for diagnostics and deleted within 7–14 days.</p>
      </Callout>
    </Container>
  );
}

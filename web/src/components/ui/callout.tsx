import { cn } from "@/lib/utils";

export function Callout({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-white p-4 text-sm text-muted shadow-sm", className)}
      {...props}
    />
  );
}

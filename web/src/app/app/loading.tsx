export default function AppLoading() {
  return (
    <div className="grid gap-4">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
      </div>
      <div className="h-56 animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}

import { AppShell } from "@/components/app/components";
import { SidebarNav, Topbar } from "./shell-nav";
import { loadMe, requireAuth } from "./data";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, supabase } = await requireAuth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const meData = await loadMe(session?.access_token ?? "");

  return (
    <AppShell
      sidebar={<SidebarNav />}
      topbar={
        <Topbar
          email={user.email}
          demoMode={meData.demoMode}
          dataQualityLabel={`Data quality ${meData.me.dataQualityScore}/100`}
        />
      }
    >
      {children}
    </AppShell>
  );
}

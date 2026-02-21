import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/components";
import { getAuthFromCookies } from "@/lib/supabase";
import { SidebarNav, Topbar } from "./shell-nav";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthFromCookies();
  if (!auth) {
    redirect("/login");
  }

  return <AppShell sidebar={<SidebarNav />} topbar={<Topbar email={auth.user.email} />}>{children}</AppShell>;
}

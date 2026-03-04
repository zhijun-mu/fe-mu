import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/stores";

import styles from "./index.module.scss";

export default function AdminLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-2xl m-0">头部</h1>
      </header>

      <aside className={styles.aside}>菜单区域</aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
    // <SidebarProvider>
    //   <AppSidebar />
    //   <SidebarInset className="flex h-screen flex-col overflow-hidden">
    //     <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4">
    //       <SidebarTrigger />
    //     </header>
    //     <div className="flex flex-1 flex-col p-1.5">
    //       <Outlet />
    //     </div>
    //   </SidebarInset>
    // </SidebarProvider>
  );
}

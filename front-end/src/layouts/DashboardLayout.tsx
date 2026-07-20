import DAside from "@/Components/Asides/DAside";
import CProfile from "@/Components/Cards/CProfile";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const profile = location.pathname.includes("profile") ? true : false;
  return (
    <div className="min-h-screen flex overflow-hidden gap-4">
      <div className="p-4 shrink-0">
        <DAside />
      </div>

      <main className="flex-1 flex flex-col p-4 pl-0 h-screen overflow-y-auto">
        {profile ? null : <CProfile />}
        <section className="flex-1">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

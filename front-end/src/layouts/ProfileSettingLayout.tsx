import AdminAside from "@/Components/Asides/AdminAside";
import AHeader from "@/Components/Headers/AHeader";
import { Outlet } from "react-router-dom";

export default function ProfileSettingLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-10 gap-6">
        <AdminAside />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
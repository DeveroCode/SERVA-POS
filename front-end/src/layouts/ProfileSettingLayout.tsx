import AdminAside from "@/Components/Asides/AdminAside";
import AHeader from "@/Components/Headers/AHeader";
import { Outlet } from "react-router-dom";

export default function ProfileSettingLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AHeader />

      <div className="flex justify-center flex-1 overflow-hidden px-54 py-10">
        <AdminAside />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
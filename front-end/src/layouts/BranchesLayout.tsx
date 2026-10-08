import FooterPOS from "@/Components/Footer/FooterPOS";
import HBranch from "@/Components/Headers/HBranch";
import { Outlet } from "react-router-dom";

export default function BranchesLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-orange-100 selection:text-orange-900">
      <HBranch />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col">
        <Outlet />
      </main>

      {/* Set the footer fixed at the bottom */}
      <FooterPOS />
    </div>
  );
}

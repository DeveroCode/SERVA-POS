import { Outlet } from "react-router-dom";
import { useState } from "react";
import AsideBranch from "@/Components/Asides/AsideBranch";
import AsideBranchMobile from "@/Components/Asides/AsideBranchMobile";
import POSHeader from "@/Components/Headers/POSHeader";

export default function BranchLayout() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 flex flex-col antialiased selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
      <POSHeader setIsMobileDrawerOpen={setIsMobileDrawerOpen} />

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Aside Desktop */}
        <AsideBranch />
        {/* Aside Mobile */}
        {isMobileDrawerOpen && (
          <AsideBranchMobile setIsMobileDrawerOpen={setIsMobileDrawerOpen} />
        )}
        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

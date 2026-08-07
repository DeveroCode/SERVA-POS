import OwnerBusinessButtons from "@/Components/Buttons/OwnerBusinessButtons";
import { Edit3 } from "lucide-react";
import BusinessBarStatus from "./BusinessBarStatus";
import type { Business } from "@/types/Index.types";
import { useState } from "react";
import ModalLayout from "@/Components/Modals/ModalLayout";
import UploadLogoBusinessView from "@/pages/dashboard/Owner/UploadLogoBusinessView";

type BusinessCoreInfoProps = {
  business: Business;
};

export default function BusinessCoreInfo({ business }: BusinessCoreInfoProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-6 sm:px-8 pb-6 pt-0 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 sm:-mt-20 gap-6">
        {/* Logo + Identity */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
          <div className="relative group/logo">
            <img
              src={`${business?.logo ? business.logo : "/logo.png"}`}
              alt={business.name}
              loading="lazy"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-xl bg-white transition-transform duration-300"
            />
            <button onClick={() => setOpen(true)} className="absolute bottom-2 cursor-pointer right-2 p-1.5 bg-gray-900/80 hover:bg-gray-900 text-white rounded-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white pb-5">
                {business.name}
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200/60">
                Owner Portal
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xl font-normal leading-relaxed">
              {business.description}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <OwnerBusinessButtons />
      </div>

      {/* Quick Meta Stats Line */}
      <BusinessBarStatus />


      <ModalLayout open={open} setOpen={setOpen}>
        <UploadLogoBusinessView />
      </ModalLayout>
    </div>
  );
}

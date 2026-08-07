import { Pencil } from "lucide-react";
import type { Business } from "@/types/Index.types";
import { useState } from "react";
import ModalLayout from "@/Components/Modals/ModalLayout";
import UploadCoverBusinessView from "@/pages/dashboard/Owner/UploadCoverBusinessView";

type CoverHeaderBusinessProps = {
  business: Business;
};

export default function CoverHeaderBusiness({
  business,
}: CoverHeaderBusinessProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group h-48 sm:h-64 w-full relative overflow-hidden bg-gray-900">
      <img
        src={business.coverImage || "/background-example.jpg"}
        loading="lazy"
        alt="Business Cover"
        className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      {/* Edit Cover */}
      <button
        onClick={() => setOpen(true)}
        className="absolute cursor-pointer top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105"
      >
        <Pencil className="w-4 h-4 text-gray-700" />
      </button>

      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>

        <span className="text-xs font-semibold text-gray-800 tracking-wide uppercase">
          {business.slug}
        </span>
      </div>


      <ModalLayout open={open} setOpen={setOpen}>
       <UploadCoverBusinessView />
      </ModalLayout>
    </div>
  );
}
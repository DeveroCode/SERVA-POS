import { LAST_BUSINESS_KEY } from "@/utils/key";
import { Plus, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddPersonalButtons() {
  const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
  return (
    <>
      {/* Actions Buttons */}
      <div className="flex items-center justify-end gap-2">
        <Link
        to={`/dashboard/business/${businessId}/register/member`}
          className="inline-flex items-center justify-center cursor-pointer gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-all duration-200 shadow-md shadow-orange-500/15 shrink-0 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar personal</span>
        </Link>
        <Link
          className="inline-flex items-center justify-center cursor-pointer gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-all duration-200 shadow-md shadow-orange-500/15 shrink-0 active:scale-[0.98]"
           to={`/dashboard/business/${businessId}/add/member`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Agregar personal</span>
        </Link>
      </div>
    </>
  );
}

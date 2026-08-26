import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Phone, Mail, Eye, Pencil } from "lucide-react";
import type { Branch, Business } from "@/types/Index.types";
import { LAST_BRANCH_KEY } from "@/utils/key";

type BranchCardProps = {
  branch: Branch
  businessId: Business["_id"];
}

export default function BranchCard({ branch, businessId }: BranchCardProps) {
  const navigate = useNavigate();
  const handleSendToken = () => {
    localStorage.setItem(LAST_BRANCH_KEY, branch._id);
    navigate(`/dashboard/business/${businessId}/${branch._id}/update`);
  }
  return (
    <div className="group bg-white rounded-[20px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>

          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            {branch.slug}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-orange-700 transition-colors duration-200">
            {branch.name}
          </h3>

          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="truncate">
              {branch.address.street}, {branch.address.city}
            </span>
          </p>
        </div>

        {/* Address */}
        <div className="space-y-2.5 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />

            <div>
              <p className="text-slate-400">Dirección</p>

              <p className="text-slate-700 font-medium">
                {branch.address.street}
              </p>

              <p className="text-slate-500">
                {branch.address.city}, {branch.address.state},{" "}
                {branch.address.zipCode}
              </p>

              <p className="text-slate-500">{branch.address.country}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Teléfono
            </span>

            <span className="text-slate-800 font-medium">{branch.phone}</span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Email
            </span>

            <span className="text-slate-800 font-medium truncate max-w-45">
              {branch.email}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
        <button
          onClick={() =>
            navigate(`/dashboard/business/${businessId}/branches/${branch._id}`)
          }
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-orange-700 transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-100"
        >
          <Eye className="w-3.5 h-3.5 cursor-pointer" />
          <span>Ver</span>
        </button>

        <button
          onClick={handleSendToken}
          title="Editar sucursal"
          className="p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

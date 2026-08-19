import type { Business } from "@/types/Index.types";
import {
  Mail,
  Phone, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BusinessCardItem({ business }: { business: Business }) {
  const navigate = useNavigate();

  const initialLetter = business.name
    ? business.name.charAt(0).toUpperCase()
    : "B";

  const handleSendBusinessId = (id: Business["_id"]) => {
    navigate(`/dashboard/business/${id}`);
  };

  return (
    <div className="group relative bg-white rounded-[20px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Image Header */}
        <div className="relative h-28 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
          <img
            src={`${business.coverImage ? business.coverImage : "/background-example.jpg"}`}
            alt={`${business.name} cover`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Quick Slug Badge */}
          <div className="absolute top-3 right-3 backdrop-blur-md bg-white/80 border border-white/60 text-slate-600 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full shadow-sm">
            /{business.slug}
          </div>
        </div>
        <div className="px-5 pt-0 pb-4">
          <div className="flex items-end justify-between -mt-8 mb-3.5">
            <div className="relative">
              {business.logo ? (
                <img
                  src={business.logo}
                  alt={business.name}
                  loading="lazy"
                  className="w-16 h-16 rounded-2xl object-cover bg-white border-2 border-white shadow-md shadow-slate-900/5 ring-1 ring-slate-200/60"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-orange-600 border-2 border-white text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-orange-500/20 ring-1 ring-orange-200/50">
                  {initialLetter}
                </div>
              )}
            </div>
          </div>

          {/* Business Name & Description */}
          <div className="space-y-1 mb-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors duration-200">
              {business.name}
            </h3>
            <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed min-h-9">
              {business.description ||
                "Sin descripción registrada para este establecimiento."}
            </p>
          </div>

          <div className="space-y-2 py-3 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2.5 truncate">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{business.email}</span>
            </div>
            <div className="flex items-center gap-2.5 truncate">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{business.phone}</span>
            </div>
          </div>

          {business.socialMedia && (
            <div className="flex items-center gap-2 pt-2 text-slate-400">
              {business.socialMedia.instagram && (
                <a
                  href={business.socialMedia.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-700 transition-colors"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              )}
              {business.socialMedia.facebook && (
                <a
                  href={business.socialMedia.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-700 transition-colors"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              )}
              {business.socialMedia.linkedin && (
                <a
                  href={business.socialMedia.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-700 transition-colors"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Manage CTA */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100/60 bg-slate-50/50">
        <button
          onClick={() => handleSendBusinessId(business._id)}
          type="button"
          className="w-full cursor-pointer py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white hover:bg-orange-600 hover:text-white border border-slate-200/90 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5 group/btn"
        >
          <span>Gestionar</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

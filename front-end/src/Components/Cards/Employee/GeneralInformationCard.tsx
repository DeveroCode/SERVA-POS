import type { Branch } from "@/types/Branch.types";
import { Check, Copy, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

type GeneralInformationCardProps = {
  branch: Branch
};

export default function GeneralInformationCard({ branch }: GeneralInformationCardProps) {
    const [copiedCode, setCopiedCode] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText("BR-NCG-001");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-6 shadow-sm">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Información General
          </h2>
          <span className="text-[11px] font-medium text-slate-400">
            Registrada el 12 Ene 2024
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400">Nombre de la Sucursal</span>
            <p className="text-slate-900 font-bold">{branch.name}</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400">Código Identificador (ID)</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                {branch.slug}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                title="Copiar código"
              >
                {copiedCode ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400">Sucursal</span>
            <p className="text-slate-800 font-semibold">
              {branch.name.slice(0, 1).toUpperCase() + branch.name.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN B: UBICACIÓN Y DIRECCIÓN */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-700" />
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ubicación y Dirección
            </h2>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:underline"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="sm:col-span-2 space-y-0.5">
            <span className="text-slate-400">Calle y Número</span>
            <p className="text-slate-900 font-semibold">
              {branch.address.street} {branch.address.zipCode}
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400">Ciudad</span>
            <p className="text-slate-800 font-semibold">{branch.address.city}</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400">Estado</span>
            <p className="text-slate-800 font-semibold">{branch.address.state}</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN C: CONTACTO DIRECTO */}
      <div className="pt-2 border-t border-slate-100">
        <div className="pb-3 border-b border-slate-100 mb-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Contacto Operativo
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-3 p-2.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
            <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-orange-700 shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-medium">
                Teléfono
              </span>
              <p className="text-slate-900 font-bold truncate">
                {branch.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
            <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-orange-700 shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-medium">
                Correo
              </span>
              <p className="text-slate-900 font-bold truncate">
               {branch.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

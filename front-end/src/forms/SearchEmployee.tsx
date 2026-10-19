import { Search, X } from "lucide-react";

import React from 'react'

export default function SearchEmployee() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={""}
                onChange={(e) => ("")}
                placeholder="Buscar por nombre o correo electrónico..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
              />
              {/* {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )} */}
            </div>

            <div className="sm:col-span-3">
              <select
                value={""}
                onChange={(e) => ("")}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
              >
                <option value="ALL">Todos los roles</option>
                <option value="OWNER">Propietario (Owner)</option>
                <option value="ADMIN">Administrador</option>
                <option value="MANAGER">Gerente</option>
                <option value="STAFF">Personal / Caja</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={""}
                onChange={(e) => ("")}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
              >
                <option value="ALL">Todos los estados</option>
                <option value="ACTIVE">Activos</option>
                <option value="INACTIVE">Inactivos</option>
                <option value="PENDING_INVITE">Pendientes</option>
              </select>
            </div>
          </div>

          {/* {(searchQuery || roleFilter !== "ALL" || statusFilter !== "ALL") && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Filtros aplicados</span>
              <button
                onClick={resetFilters}
                className="text-orange-700 hover:underline font-bold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            </div>
          )} */}
        </div>
  )
}

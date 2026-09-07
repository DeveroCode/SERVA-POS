import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EmptyPersonnelState } from "@/Components/Cards/EmptyPersonalState";
import { useBusinessMembers } from "@/hooks/useBusinessMembers";
import type { Business } from "@/types/Index.types";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import Loader from "@/pages/Loader";
import PersonalCard from "@/Components/Cards/Branch/PeronalCard";
import AddPersonalButtons from "@/Components/Buttons/AddPersonalButtons";
export default function PersonnelView() {
  const [search, setSearch] = useState("");
  const businessId = localStorage.getItem(LAST_BUSINESS_KEY) || "";

  const { data: personnel, isLoading } = useBusinessMembers(
    businessId as Business["_id"],
  );

  const newPersonnelUrl = "/settings/business/personnel/new";

  const filteredPersonnel = useMemo(() => {
    if (!personnel) return [];

    const query = search.toLowerCase().trim();

    if (!query) return personnel;

    return personnel.filter((member) => {
      const fullName =
        `${member.name} ${member.last_name}`.toLowerCase();

      return (
        fullName.includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone_number.toLowerCase().includes(query)
      );
    });
  }, [personnel, search]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full font-sans text-slate-900 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Personal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Administra los miembros y permisos de tu negocio.
          </p>
        </div>
        <AddPersonalButtons />
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/40 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nombre, correo o teléfono..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-xl font-medium placeholder:text-slate-400 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium shrink-0 hidden sm:inline-block">
            Total: {personnel?.length ?? 0} miembros
          </span>
        </div>
        {/* Empty State */}
        {!personnel?.length ? (
          <EmptyPersonnelState newPersonnelUrl={newPersonnelUrl} />
        ) : filteredPersonnel.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-slate-400" />
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              No encontramos resultados
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Intenta buscar con otro nombre, correo o teléfono.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredPersonnel.map((member) => {
              return <PersonalCard key={member._id} member={member} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search } from "lucide-react";
import { useBusinessMembers } from "@/hooks/useBusinessMembers";
import {
  type FoundMember,
  type Business,
  type SearchMemberParams,
} from "@/types/Index.types";
import Loader from "@/pages/Loader";
import AddPersonalButtons from "@/Components/Buttons/AddPersonalButtons";
import PersonnelTable from "@/Components/PersonnelTable";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useSearchMember } from "@/mutations/useMutationBusinessMember";

export default function PersonnelView() {
  const [foundMember, setFoundMember] = useState<
    FoundMember["foundMember"] | null
  >(null);
  const [searchValue, setSearchValue] =
    useState<SearchMemberParams["search"]>("");

  const { currentBusinessId: businessId } = useBusinessContext();
  const { mutate, isPending } = useSearchMember();

  const { data: personnel, isLoading } = useBusinessMembers(
    businessId as Business["_id"],
  );

  const handleMemberFound = (member: FoundMember) => {
    setFoundMember(member.foundMember);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    mutate(
      { search: searchValue.trim() },
      {
        onSuccess: (member) => {
          handleMemberFound(member);
        },
      },
    );
  };

  if (isPending) return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div className="w-full font-sans text-slate-900 space-y-6 pb-8">
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

      {/* Search Section */}
      <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchValue}
              onChange={(event) => {
                const value = event.target.value;
                setSearchValue(value);

                if (!value) {
                  setFoundMember(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Buscar por nombre, correo o teléfono..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
            />
          </div>

          <span className="text-xs text-slate-400 font-medium shrink-0">
            Total: {personnel?.length ?? 0} miembros
          </span>
        </div>
      </div>

      {/* Personnel Table */}
      {!personnel?.length ? (
        <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center">
          <h2 className="text-sm font-semibold text-slate-700">
            No hay miembros registrados en este negocio
          </h2>

          <p className="text-xs text-slate-400 mt-1.5">
            Agrega miembros para comenzar a administrar el personal.
          </p>
        </div>
      ) : (
        <PersonnelTable foundMember={foundMember} members={personnel} />
      )}
    </div>
  );
}

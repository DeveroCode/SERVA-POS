import PersonnelTableRow from "@/Components/PersonnelTableRow";

import type { FoundMember } from "@/types/BusinessMember.type";
import type { Member, paginationType } from "@/types/Index.types";

import { useState } from "react";
import Pagination from "./Pagination";

type PersonnelTableProps = {
  members: Member[];
  foundMember?: FoundMember["foundMember"];
  pagination?: paginationType;
  onPageChange: (page: number) => void;
};

export default function PersonnelTable({
  members,
  foundMember,
  pagination,
  onPageChange,
}: PersonnelTableProps) {
  const [openMenuActions, setOpenMenuActions] = useState<string | null>(null);

  // const membersToDisplay = foundMember ? [foundMember] : members;
  const membersToDisplay = foundMember ?? members;

  return (
    <>
      <div className="w-full rounded-[20px] border border-slate-200/90 bg-white shadow-sm">
        <div className="w-full">
          <table className="w-full min-w-175 border-collapse table-auto">
            <thead>
              <tr>
                <th className="bg-slate-50 rounded-t-[20px] px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  Miembro
                </th>

                <th className="bg-slate-50 px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  Rol
                </th>

                <th className="bg-slate-50 px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  Estado
                </th>

                <th className="bg-slate-50 rounded-t-[20px] px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {membersToDisplay.map((member) => (
                <PersonnelTableRow
                  key={member._id}
                  member={member}
                  openMenuActions={openMenuActions}
                  setOpenMenuActions={setOpenMenuActions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      {!foundMember && pagination && pagination.totalPages > 1 && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
}

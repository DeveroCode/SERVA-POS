import PersonnelTableRow from "@/Components/PersonnelTableRow";

import type { Members } from "@/types/Member.types";

import { useState } from "react";

type PersonnelTableProps = {
  members: Members;
};

export default function PersonnelTable({ members }: PersonnelTableProps) {
  const [openMenuActions, setOpenMenuActions] = useState<string | null>(null);

  return (
    <div className="w-full rounded-[20px] border border-slate-200/90 bg-white shadow-sm">
      <div className="oveflow-x-auto w-full">
        <table className="w-full min-w-175 border-collapse  table-auto">
          <thead>
            <tr>
              <th className="bg-slate-50 rounded-t-[20px] px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                Miembro
              </th>

              <th className=" bg-slate-50 px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                Rol
              </th>

              <th className=" bg-slate-50 px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                Estado
              </th>

              <th className=" bg-slate-50 rounded-t-[20px] px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <PersonnelTableRow
                key={member._id}
                openMenuActions={openMenuActions}
                setOpenMenuActions={setOpenMenuActions}
                member={member}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { MEMBER_ROLES, MEMBER_ROLES_EXPLAIN } from "@/types/BusinessMember.type";
import type { searchEmplooyeForm } from "@/types/Employee.type";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "@/Components/Alerts/ErrorAlert";

const selectClass =
  "w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700";

export default function FiltersEmployeesForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<searchEmplooyeForm>();

  return (
    <>
      <div className="sm:col-span-3">
        <select
          className={selectClass}
          {...register("role", {
            setValueAs: (value: string) => (value === "" ? null : value),
          })}
        >
          <option value="">Todos los roles</option>
          {Object.entries(MEMBER_ROLES_EXPLAIN).map(([key, description]) => (
            <option
              key={key}
              value={MEMBER_ROLES[key as keyof typeof MEMBER_ROLES]}
            >
              {description}
            </option>
          ))}
        </select>
        {errors.role && <ErrorAlert>{errors.role.message}</ErrorAlert>}
      </div>

      <div className="sm:col-span-3">
        <select
          className={selectClass}
          {...register("isActive", {
            setValueAs: (value: string) =>
              value === "" ? null : value === "true",
          })}
        >
          <option value="">Todos los usuarios</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
        {errors.isActive && <ErrorAlert>{errors.isActive.message}</ErrorAlert>}
      </div>
    </>
  );
}

import useBusinessContext from "@/hooks/useBusinessContext";
import {
  useSearchEmployee,
  useSearchEmployeeByFilter,
} from "@/mutations/useMutationEmployee";
import type { searchEmplooyeForm } from "@/types/Employee.type";
import type { GetEmployees } from "@/types/Index.types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import FiltersEmployeesForm from "./FiltersEmployeesForm";
import SearchEmployeeForm from "./SearchEmployeeForm";

type SearchEmployeeProps = {
  page?: number;
  onSearch: (data: GetEmployees | null) => void;
  resetPage: () => void;
};

export default function SearchEmployee({
  page = 1,
  onSearch,
  resetPage,
}: SearchEmployeeProps) {
  const { currentBranchId } = useBusinessContext();

  const methods = useForm<searchEmplooyeForm>({
    defaultValues: { search: "", role: null, isActive: null },
  });

  const { handleSubmit, control, setValue, watch } = methods;
  const searchValue = useWatch({ control, name: "search" });
  const role = useWatch({ control, name: "role" });
  const isActive = useWatch({ control, name: "isActive" });


  const [submittedSearch, setSubmittedSearch] = useState("");

  // ---- Valores derivados (sin efectos, sin renders extra) ----
  const hasFilters = role !== null || isActive !== null;
  const activeSearch = !hasFilters && searchValue.trim() ? submittedSearch : "";
  const mode = hasFilters ? "filters" : activeSearch ? "search" : "all";

  console.log({ role, isActive, hasFilters, mode });

  const { data: foundEmployee } = useSearchEmployee({
    page,
    search: activeSearch,
    branchId: currentBranchId,
  });

  const { data: filteredEmployees } = useSearchEmployeeByFilter({
    page,
    branchId: currentBranchId,
    isActive,
    role,
  });

  // ---- Limpieza reactiva a cambios del formulario ----
  // setState dentro del callback de una suscripción NO es síncrono en el efecto,
  // así que la regla no se dispara. Es el uso legítimo de un efecto.
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      // Se activó un filtro → limpiar búsqueda
      if (
        (name === "role" || name === "isActive") &&
        (values.role != null || values.isActive != null)
      ) {
        resetPage();
        setSubmittedSearch("");
        setValue("search", "");
        return;
      }

      // Se vació el input → limpiar búsqueda enviada
      if (name === "search" && !values.search?.trim()) {
        setSubmittedSearch("");
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, resetPage]);

  // ---- Único efecto que informa al padre (no hace setState local) ----
  useEffect(() => {
    if (mode === "all") {
      onSearch(null);
    } else if (mode === "filters" && filteredEmployees) {
      onSearch(filteredEmployees);
    } else if (mode === "search" && foundEmployee) {
      onSearch(foundEmployee);
    }
  }, [mode, filteredEmployees, foundEmployee, onSearch]);

  // ---- Submit: todo en un solo event handler → React lo agrupa en 1 render ----
  const handleSendSearch = useCallback(
    (data: searchEmplooyeForm) => {
      resetPage();
      setValue("role", null);
      setValue("isActive", null);
      setSubmittedSearch(data.search.trim());
      // Si está vacío, mode pasa a "all" y el efecto llama onSearch(null)
    },
    [resetPage, setValue],
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 sm:grid-cols-12 gap-3"
          noValidate
          onSubmit={handleSubmit(handleSendSearch)}
        >
          <SearchEmployeeForm />
          <FiltersEmployeesForm />
        </form>
      </FormProvider>
    </div>
  );
}
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

  const { handleSubmit, control, setValue } = methods;
  const searchValue = useWatch({ control, name: "search" });
  const role = useWatch({ control, name: "role" });
  const isActive = useWatch({ control, name: "isActive" });

  const [submittedSearch, setSubmittedSearch] = useState("");

  // ---- Valores derivados ----
  const hasFilters =
    Boolean(role) || (isActive !== null && isActive !== undefined);
  const activeSearch = searchValue.trim() ? submittedSearch : "";
  const mode = activeSearch ? "search" : hasFilters ? "filters" : "all";

  const { data: foundEmployee } = useSearchEmployee({
    page,
    search: activeSearch,
    branchId: currentBranchId,
  });

  const { data: filteredEmployees } = useSearchEmployeeByFilter({
    page,
    branchId: currentBranchId,
    isActive: mode === "filters" ? isActive : null,
    role: mode === "filters" ? role : null,
  });

  // ---- Informa al padre del resultado a mostrar ----
  useEffect(() => {
    if (mode === "all") {
      onSearch(null);
    } else if (mode === "filters" && filteredEmployees) {
      onSearch(filteredEmployees);
    } else if (mode === "search" && foundEmployee) {
      onSearch(foundEmployee);
    }
  }, [mode, filteredEmployees, foundEmployee, onSearch]);

  // ---- Event handlers ----
  // Al cambiar un filtro se descarta la búsqueda de texto.
  const handleFilterChange = useCallback(() => {
    resetPage();
    setSubmittedSearch("");
    setValue("search", "");
  }, [resetPage, setValue]);

  // Al buscar por texto se descartan los filtros.
  const handleSendSearch = useCallback(
    (data: searchEmplooyeForm) => {
      resetPage();
      setValue("role", null);
      setValue("isActive", null);
      setSubmittedSearch(data.search.trim());
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
          <FiltersEmployeesForm onFilterChange={handleFilterChange} />
        </form>
      </FormProvider>
    </div>
  );
}
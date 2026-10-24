import useBusinessContext from "@/hooks/useBusinessContext";
import { useSearchEmployee } from "@/mutations/useMutationEmployee";
import type { searchEmplooyeForm } from "@/types/Employee.type";
import type { GetEmployees } from "@/types/Index.types";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
    defaultValues: {
      search: "",
      role: null,
      isActive: true,
    },
  });

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { handleSubmit, watch } = methods;
  const searchValue = watch("search");

  const { data: foundEmployee } = useSearchEmployee({
    page,
    search: submittedSearch,
    branchId: currentBranchId,
  });

  // Restore all employees when the input is cleared
  useEffect(() => {
    if (!searchValue.trim() && submittedSearch) {
      setSubmittedSearch("");
      onSearch(null);
    }
  }, [searchValue, submittedSearch, onSearch]);

  // Send search results to the parent
  useEffect(() => {
    if (submittedSearch.trim() && foundEmployee) {
      onSearch(foundEmployee);
    }
  }, [foundEmployee, onSearch, submittedSearch]);

  const handleSendSearch = (data: searchEmplooyeForm) => {
    const search = data.search.trim();
    resetPage();
    if (!search) {
      setSubmittedSearch("");
      onSearch(null);
      return;
    }

    setSubmittedSearch(search);
  };

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

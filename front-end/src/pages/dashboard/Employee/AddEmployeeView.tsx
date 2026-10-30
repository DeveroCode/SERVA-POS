import ModalLayout from "@/Components/Modals/ModalLayout";
import AddEmployeeToBranchForm from "@/forms/AddEmployeeToBranchForm";
import SearchEmployeeToJoinForm from "@/forms/SearchEmployeeToJoinForm";
import { useAddEmployeeToBranch } from "@/mutations/useMutationEmployee";
import Loader from "@/pages/Loader";
import {
  MEMBER_ROLES,
  type findMemberToJoin,
  type addEmployeeToBranch,
} from "@/types/Index.types";
import { ArrowLeft, UserCheck } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SearchEmployeeFormView from "./SearchEmployeeFormView";
import useBusinessContext from "@/hooks/useBusinessContext";
import { generateUserKey } from "@/utils/index";

export default function AddEmployeeView() {
  const { currentBranchId } = useBusinessContext();
  const { mutate, isPending } = useAddEmployeeToBranch();

  /** Search Member */
  const [openModalSearch, setOpenModalSearch] = useState(false);

  /** Selected Member */
  const [foundMember, setFoundMember] = useState<findMemberToJoin | null>(null);

  /** Add Member to Business */
  const methods = useForm<addEmployeeToBranch>({
    defaultValues: {
      role: MEMBER_ROLES.STAFF,
      password: "",
      passwordConfirm: "",
      userKey: "",
      branchId: currentBranchId,
      employeeId: "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const handleMemberFound = (employee: findMemberToJoin) => {
    const found = employee;

    if (!found) return;

    setFoundMember(found);
    setOpenModalSearch(false);

    setValue("employeeId", found._id, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("userKey", generateUserKey(found.name, found.last_name), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleSendData = (formData: addEmployeeToBranch) => {
    console.log(formData);
    mutate(formData, {
      onSuccess: () => {
        reset();
        setFoundMember(null);
      },
    });
  };

  if (isPending) return <Loader />;

  return (
    <>
      <div className="w-full max-w-7xl font-sans text-slate-900 space-y-6 pb-12">
        {/* Header */}
        <div className="space-y-2">
          <Link
            to={`/branch/equipo`}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a equipo</span>
          </Link>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Agregar Empleado
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Selecciona un usuario y configura sus credenciales de acceso.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200/80" />

        <FormProvider {...methods}>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleSendData)}
            noValidate
          >
            {/* Member */}
            <SearchEmployeeFormView
              employee={foundMember}
              onOpenSearchModal={() => setOpenModalSearch(true)}
            />

            <AddEmployeeToBranchForm />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                className="px-5 cursor-pointer py-2.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white cursor-pointer bg-orange-700 hover:bg-orange-800 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center gap-2 active:scale-[0.98]"
              >
                <UserCheck className="w-4 h-4" />
                <span>Agregar miembro</span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      <ModalLayout open={openModalSearch} setOpen={setOpenModalSearch}>
        <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider py-2">
          Buscar miembro del negocio
        </h2>

        <SearchEmployeeToJoinForm onMemberFound={handleMemberFound} />
      </ModalLayout>
    </>
  );
}

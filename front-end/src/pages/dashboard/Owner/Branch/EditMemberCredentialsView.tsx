import UpdateMemberCredentialsForm from "@/forms/UpdateMemberCredentialsForm";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useGetCredentiasl, useUpdateEmployeeCredentials } from "@/mutations/useMutationEmployee";
import Loader from "@/pages/Loader";
import {
  MEMBER_ROLES,
  type updateCredentialsForm,
  type updateEmployeeCredentialsForms,
} from "@/types/Index.types";
import { ArrowLeft, UserCheck } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditMemberCredentialsView() {
  const {
    currentBranchId: branchId,
    currentEmployeeId,
    navigate,
  } = useBusinessContext();

  const { data: credentials, isError, isLoading } = useGetCredentiasl({
    branchId,
    employeeId: currentEmployeeId,
  });

  const { mutate, isPending } = useUpdateEmployeeCredentials();

  /** Add Member to Business */
  const methods = useForm<updateCredentialsForm>({
    defaultValues: {
      role: MEMBER_ROLES.OWNER,
      name: "",
      password: "",
      branchName: "",
      passwordConfirm: "",
      userKey: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSendData = (data: updateCredentialsForm) => {
    // Send data to backend
    const sendData: updateEmployeeCredentialsForms = {
      formData: data,
      employeeId: currentEmployeeId,
      branchId,
    };
    mutate(sendData);
  };

  useEffect(() => {
    if (!credentials) return;

    reset({
      role: credentials.role,
      password: "",
      passwordConfirm: "",
      userKey: credentials.userKey,
      branchName: credentials.branch.name,
      name: `${credentials.user.name} ${credentials.user.last_name}`,
    });
  }, [credentials, reset]);

  useEffect(() => {
    if (!isError) return;

    toast.error("Este miembro aún no tiene credenciales.");
    navigate('/branch/equipo');
  }, [isError, currentEmployeeId, navigate]);

  if (isPending) return <Loader />;

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="w-full max-w-7xl font-sans text-slate-900 space-y-6 pb-12">
        {/* Header */}
        <div className="space-y-2">
          <Link
            to={'/branch/equipo'}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />

            <span>Volver atrás</span>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Agregar personal
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
            <UpdateMemberCredentialsForm />
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

                <span>Actualizar</span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

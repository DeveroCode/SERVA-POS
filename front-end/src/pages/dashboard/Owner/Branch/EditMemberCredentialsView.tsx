import UpdateMemberCredentialsForm from "@/forms/UpdateMemberCredentialsForm";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useGetMemberCredentials, useUpdateMemberCredentials } from "@/mutations/useMutationBusinessMember";
import Loader from "@/pages/Loader";
import {
  MEMBER_ROLES,
  type UpdateCredentialsForm,
  type UpdateMemberCredentials
} from "@/types/Index.types";
import { ArrowLeft, UserCheck } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function EditMemberCredentialsView() {
  const {
    currentBranchId: branchId,
    currentBusinessId: businessId,
    currentMemberId: memberId,
  } = useBusinessContext();
  const { data: credentials, isLoading } = useGetMemberCredentials({
    branchId,
    businessId,
    memberId,
  });

  const {mutate, isPending} = useUpdateMemberCredentials();

  /** Add Member to Business */
  const methods = useForm<UpdateCredentialsForm>({
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

  const handleSendData = (data: UpdateCredentialsForm) => {
    // Send data to backend
    const sendData: UpdateMemberCredentials = {
      formData: data,
      memberId,
      branchId,
      businessId,
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

  if (isPending) return <Loader />;

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="w-full max-w-4xl font-sans text-slate-900 space-y-6 pb-12">
        {/* Header */}
        <div className="space-y-2">
          <Link
            to={`/dashboard/business/${businessId}/personnel`}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />

            <span>Volver a personal</span>
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
          <form className="space-y-6" onSubmit={handleSubmit(handleSendData)} noValidate>
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

import { UserPlus, HelpCircle, ArrowLeft } from "lucide-react";
import RegisterPersonalForm from "@/forms/RegisterPersonalForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  type MemberRole,
  type RegisterMember,
  type UpdateMember,
} from "@/types/Index.types";
import {
  useGetMember,
  useUpdateMember,
} from "@/mutations/useMutationBusinessMember";
import { Link } from "react-router-dom";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useEffect } from "react";
import Loader from "@/pages/Loader";

export default function UpdatePersonnelView() {
  const { currentBusinessId: _id, currentMemberId: memberId } =
    useBusinessContext();
  const { data: member, isLoading } = useGetMember({ _id, memberId });

  const { mutate } = useUpdateMember(); // BusinessId and MemberId for found member and update the credentials
  const methods = useForm<RegisterMember>({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone_number: "",
      isActive: false,
      role: member?.role as MemberRole,
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSendData = (formData: RegisterMember) => {
    const dataSend: UpdateMember = {
      formData,
      memberId,
    };
    mutate(dataSend);
  };

  useEffect(() => {
    if (!member) return;

    reset({
      name: member.name,
      last_name: member.last_name,
      email: member.email,
      phone_number: member.phone_number,
      isActive: member.isActive,
      role: member.role,
    });
  }, [member, reset]);

  if(isLoading) return <Loader />

  return (
    <div className="w-full font-sans text-slate-900 space-y-5">
      <div className="space-y-2">
        <Link
          to={`/dashboard/business/${_id}/personnel`}
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
      <div className="flex items-start justify-between pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700 shrink-0 shadow-sm">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Registrar nuevo usuario
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              Crea una cuenta para una persona que podrá trabajar dentro de
              SERVA.
            </p>
          </div>
        </div>
      </div>

      {/* Banner explicativo contextual */}
      <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Esta acción registra la cuenta globalmente. La asignación a un{" "}
          <strong>Business</strong> o <strong>Sucursal</strong> específica se
          realiza posteriormente desde la sección correspondiente.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          className="space-y-5 overflow-y-auto pr-1"
          onSubmit={handleSubmit(handleSendData)}
          noValidate
        >
          <RegisterPersonalForm />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 cursor-pointer rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-[0.98]"
            >
              Registrar usuario
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

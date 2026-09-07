import { UserPlus, HelpCircle } from "lucide-react";
import RegisterPersonalForm from "@/forms/RegisterPersonalForm";
import { FormProvider, useForm } from "react-hook-form";
import { MEMBER_ROLES, type RegisterMember } from "@/types/Index.types";
import { useRegisterMember } from "@/mutations/useMutationBusinessMember";

export default function RegisterPersonalView() {
  const { mutate } = useRegisterMember();
  const methods = useForm<RegisterMember>({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone_number: "",
      isActive: true,
      role: MEMBER_ROLES.STAFF, // Set default role
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSendData = (formData: RegisterMember) => {
    mutate(formData, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <div className="w-full font-sans text-slate-900 space-y-5">
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

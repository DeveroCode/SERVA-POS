import {
  Building2,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import CredentialsForm from "@/forms/CredentialsForm";
import { useCredentialsEmployee } from "@/mutations/useMutationEmployee";
import { FormProvider, useForm } from "react-hook-form";
import type { CredentialForm } from "@/types/Index.types";

type StartBranchModalProps = {
  sucursalName: string;
};

export default function StartBranchModal({
  sucursalName = "Unknown",
}: StartBranchModalProps) {
  // Mutations
  const { mutate, isPending } = useCredentialsEmployee();
  const methods = useForm<CredentialForm>({
    defaultValues: {
      userKey: "",
      password: "",
    },
  });

  const { handleSubmit, reset } = methods;
  // Send data to backend
  const handleSendCredentials = (data: CredentialForm) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <div className="relative p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-100/70 text-orange-700 text-[10px] font-bold uppercase tracking-wider mb-0.5">
              <Building2 className="w-3 h-3" />
              {sucursalName}
            </span>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Credenciales de Acceso
            </h2>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          Ingresa tu <strong className="text-slate-700">UserKey</strong> y
          contraseña para desbloquear y administrar la sucursal.
        </p>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSendCredentials)}
          noValidate
          className="p-6 space-y-4"
        >
          <CredentialsForm />
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending || !methods.formState.isValid}
              className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-orange-700 hover:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-orange-500/15 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isPending ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar a Sucursal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </FormProvider>

      <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 text-center">
        <p className="text-[11px] text-slate-400">
          ¿Olvidaste tu UserKey? Contacta al administrador del sistema.
        </p>
      </div>
    </>
  );
}

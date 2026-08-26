import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Business, createNewBranch } from "@/types/Index.types";
import { useCreateBranch } from "@/mutations/useMutationBranch";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import { slugify } from "@/utils/index";
import AddNewBranchForm from "@/forms/AddNewBranchForm";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useBusiness } from "@/hooks/useBusiness";

export default function AddBranchView() {
  const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
  const {data: business} = useBusiness(businessId as Business["_id"]);
  const { mutate, isPending } = useCreateBranch();
  const methods = useForm<createNewBranch>({
    defaultValues: {
      name: "",
      slug: "",
      phone: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "México",
        zipCode: "",
      },
    },
  });

  const { handleSubmit, reset, setValue, control } = methods;
  const name = useWatch({ control, name: "name" });
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      setValue("slug", slugify(name), {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue("slug", "");
    }
  }, [name, setValue]);

  const handleSendData = (data: createNewBranch) => {
    // Send data to backend
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-sans text-slate-900 pb-16">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 pb-6">
        <button
          type="button"
          onClick={() => navigate(`/dashboard/business/${businessId}/branches`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a sucursales</span>
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Nueva Sucursal
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Agrega la información general y ubicación física de la nueva
            sucursal.
          </p>
        </div>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSendData)}
          className="space-y-8"
          noValidate
        >
          <AddNewBranchForm business={business as Business} />

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate(`/dashboard/business/${businessId}/branches`)
              }
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all duration-200 shadow-sm"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 cursor-pointer text-xs font-semibold text-white bg-orange-700 hover:bg-[#c2410c] rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPending ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Crear sucursal</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

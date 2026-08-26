import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Branch, Business, updateBrach } from "@/types/Index.types";
import { useUpdateBranch } from "@/mutations/useMutationBranch";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY } from "@/utils/key";
import { slugify } from "@/utils/index";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useBusiness } from "@/hooks/useBusiness";
import { useBranch } from "@/hooks/useBranch";
import Loader from "@/pages/Loader";
import UpdateBranchForm from "@/forms/UpdateBranchForm";

export default function UpdateBranchView() {
  const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
  const id = useParams().branchId;
  const branchId = localStorage.getItem(LAST_BRANCH_KEY) || id;
  const { data: business } = useBusiness(businessId as Business["_id"]);
  const { data: branch, isLoading } = useBranch(branchId as Branch["_id"]);
  const { mutate, isPending } = useUpdateBranch();
  const methods = useForm<updateBrach>({
    defaultValues: {
      name: branch?.name || "",
      slug: branch?.slug || "",
      phone: branch?.phone || "",
      email: branch?.email || "",
      address: {
        street: branch?.address.street || "",
        city: branch?.address.city || "",
        state: branch?.address.state || "",
        country: branch?.address.country || "México",
        zipCode: branch?.address.zipCode || "",
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

  const handleSendData = (data: updateBrach) => {
    // Send data to backend
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-sans text-slate-900 pb-16">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 pb-6">
        <button
          type="button"
          onClick={() => navigate(`/dashboard/business/${businessId}/branches`)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a sucursales</span>
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sucursal {branch?.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Modifica la información de la sucursal.
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
          <UpdateBranchForm business={business as Business} />

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate(`/dashboard/business/${businessId}/branches`)
              }
              className="px-5 cursor-pointer py-2.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all duration-200 shadow-sm"
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
                  <span>Actualizar sucursal</span>
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

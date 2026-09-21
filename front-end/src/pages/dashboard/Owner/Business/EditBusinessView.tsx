import ButtonBlank from "@/Components/Buttons/ButtonBlank";
import UpdateBusinessForm from "@/forms/UpdateBusinessForm";
import { useBusiness } from "@/hooks/useBusiness";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useUpdateBusiness } from "@/mutations/useMutationBusiness";
import type { Business, UpdateBusiness } from "@/types/Business.types";
import { slugify } from "@/utils/index";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

type EditBusinessViewProps = {
  onClose?: () => void;
};

export default function EditBusinessView({ onClose }: EditBusinessViewProps) {
  const { currentBusinessId: businessId } = useBusinessContext();
  const { data: business } = useBusiness(businessId as Business["_id"]);
  const { mutate, isPending } = useUpdateBusiness();

  const methods = useForm<UpdateBusiness["formData"]>({
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      email: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedin: "",
      },
    },
  });

  const { handleSubmit, reset, setValue, control } = methods;

  // Carga los datos del negocio en el formulario una vez que la API responde
  useEffect(() => {
    if (business) {
      reset({
        name: business.name || "",
        description: business.description || "",
        phone: business.phone || "",
        email: business.email || "",
        socialMedia: {
          facebook: business.socialMedia?.facebook || "",
          instagram: business.socialMedia?.instagram || "",
          linkedin: business.socialMedia?.linkedin || "",
        },
      });
    }
  }, [business, reset]);

  // Actualiza el slug dinámicamente según el nombre sin bucles infinitos
  const name = useWatch({ control, name: "name" });
  useEffect(() => {
    if (name) {
      setValue("slug", slugify(name), { shouldValidate: true });
    }
  }, [name, setValue]);

  const handleSubmitForm = (data: UpdateBusiness["formData"]) => {
    if (!businessId) return;

    const sendForm: UpdateBusiness = {
      formData: data,
      businessId,
    };

    mutate(sendForm, {
      onSuccess: () => {
        if (onClose) onClose();
      },
    });
  };

  return (
    <div className="overflow-x-hidden px-4 sm:px-10 space-y-6">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center space-y-2">
        <div className="bg-orange-100 rounded-2xl p-2.5 border border-orange-200 shadow-sm">
          <Building2 size={28} className="text-orange-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
          Actualiza la información de tu negocio
        </h2>
        <p className="text-xs text-slate-500 max-w-md">
          Mantén actualizada la información de tu negocio. Estos datos se
          utilizarán para mostrar y administrar tu empresa dentro del ecosistema
          de SERVA.
        </p>
      </section>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          noValidate
          className="space-y-6 w-full"
        >
          <UpdateBusinessForm />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <ButtonBlank
              className="bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-700 cursor-pointer"
              type="button"
              onClick={onClose}
              text="Cancelar"
            />
            <ButtonBlank
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm cursor-pointer disabled:opacity-50"
              type="submit"
              disabled={isPending}
              text={isPending ? "Guardando..." : "Actualizar"}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

import ButtonBlank from "@/Components/Buttons/ButtonBlank";
import UpdateBusinessForm from "@/forms/UpdateBusinessForm";
import { useBusiness } from "@/hooks/useBusiness";
import { useUpdateBusiness } from "@/mutations/useMutationBusiness";
import type { Business, UpdateBusiness } from "@/types/Business.types";
import { slugify } from "@/utils/index";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
export default function EditBusinessView() {
  const { businessId } = useParams<{ businessId: Business["_id"] }>();
  const { data: business } = useBusiness(businessId as Business["_id"]);
  const { mutate } = useUpdateBusiness();
  const methods = useForm<UpdateBusiness["formData"]>({
    defaultValues: {
      name: business?.name || "",
      description: business?.description || "",
      phone: business?.phone || "",
      email: business?.email || "",
      socialMedia: {
        facebook: business?.socialMedia?.facebook || "",
        instagram: business?.socialMedia?.instagram || "",
        linkedin: business?.socialMedia?.linkedin || "",
      },
    },
  });

  const { handleSubmit, reset, setValue, control } = methods;
  const name = useWatch({ control, name: "name" });
  useEffect(() => {
    if (name) {
      setValue("slug", slugify(name));
    }
  });

  const handleSubmitForm = (data: UpdateBusiness["formData"]) => {
    const sendForm: UpdateBusiness = {
      formData: data,
      businessId: businessId as Business["_id"],
    };

    mutate(sendForm, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <div className="overflow-x-hidden px-20 space-y-5">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Header */}
        <div className="bg-orange-100 rounded-2xl p-2 border border-orange-200 shadow">
          <Building2 size={32} className="text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold capitalize text-gray-700 ">
          Actualiza la información de tu negocio
        </h2>
        <p className="text-xs text-center text-gray-500">
          Mantén actualizada la información de tu negocio. Estos datos se
          utilizarán para mostrar y administrar tu empresa dentro del ecosistema
          de SERVA.
        </p>
      </section>
      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          noValidate
          className="space-y-8 w-full"
        >
          <UpdateBusinessForm />

          <div className="flex justify-end gap-3">
            <ButtonBlank
              className="bg-white border border-slate-200 shadow"
              type="submit"
              text="Cancelar"
            />
            <ButtonBlank
              className="bg-orange-600 text-white"
              type="submit"
              text="Crear negocio"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

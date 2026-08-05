import ButtonBlank from "@/Components/Buttons/ButtonBlank";
import AddBusinessForm from "@/forms/AddBusinessForm";
import { useCreateBusiness } from "@/mutations/useMutationBusiness";
import { Building2 } from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import  type { CreateBusiness } from "@/types/Index.types";
import { useEffect } from "react";
import { slugify } from "@/utils/index";

export default function AddBusinessView() {
  const {mutate} = useCreateBusiness();
  const methods = useForm<CreateBusiness>({
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      email: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedin: "",
      }
    }
  });

  const {handleSubmit, reset, setValue, control} = methods;
  const name = useWatch({control, name: "name"});

  useEffect(() => {
    if(name){
      setValue("slug", slugify(name));
    }
  });
  const handleSubmitForm = (data: CreateBusiness) => {
  mutate(data, {
    onSuccess: () => {
      reset();
    }
  });
  }
  return (
    <div className="overflow-x-hidden px-20 space-y-5">
      <section className="flex flex-col justify-center items-center space-y-3">
        <div className="bg-orange-100 rounded-2xl p-2 border border-orange-200 shadow">
          <Building2 size={32} className="text-orange-600" />
        </div>

        <h2 className="text-2xl font-bold capitalize text-gray-700 ">
          Crear tu negocio
        </h2>
        <p className="text-md text-center text-gray-500">
          Crea el perfil principal de tu empresa. Esta información se utilizará
          en todo el ecosistema de SERVA
        </p>
      </section>
      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} noValidate className="space-y-8 w-full">
        <AddBusinessForm />

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

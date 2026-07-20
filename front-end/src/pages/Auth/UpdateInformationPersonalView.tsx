import UpdatePersonalInfoForm from "@/forms/UpdatePersonalInfoForm";
import { useUser } from "@/hooks/useUser";
import { useUpdateUser } from "@/mutations/useMutationUser";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import type { UpdateUser } from "types/User.types";

export default function UpdateInformationPersonalView() {
  const { data: user } = useUser();
  const { mutate } = useUpdateUser();
  const methods = useForm<UpdateUser>({
    defaultValues: {
      name: user?.name || "",
      last_name: user?.last_name || "",
      birthday: user?.birthday || "",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSendForm = (data: UpdateUser) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-center items-center">
        <div className="border border-gray-500 p-3 rounded-lg">
          <User size={20} className="text-gray-800" />
        </div>

        <div className="text-center py-2">
          <h2 className="font-bold text-gray-900 text-xl">
            Actualiza tu información
          </h2>
          <p className="text-xs text-gray-600">
            Mantén tu información personal actualizada para que tu cuenta esté
            siempre al día.
          </p>
        </div>
      </section>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSendForm)} noValidate>
          <UpdatePersonalInfoForm />
          <button
            type="submit"
            className="transition-colors duration-75 bg-orange-600 cursor-pointer text-white font-bold px-4 rounded w-full py-2 my-6"
          >
            Actualizar
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

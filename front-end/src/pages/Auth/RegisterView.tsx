import RegisterForm from "@/forms/RegisterForm";
import { useRegisterUser } from "@/mutations/useMutationAuth";
import { FormProvider, useForm } from "react-hook-form";
import { type RegisterForm as RegisterFormTypes } from "@/types/Index.types.ts";
import { USER_ROLES } from "@/lib/index";
export default function RegisterView() {
  const { mutate } = useRegisterUser();
  const methods = useForm<RegisterFormTypes>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: Object.values(USER_ROLES)[0], // Set default role
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSendForm = (data: RegisterFormTypes) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <div className="space-y-2">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSendForm)} noValidate>
          <RegisterForm />

          <button type="submit" className="bg-orange-200 transition-colors duration-75 hover:bg-orange-600 cursor-pointer text-white font-bold px-4 rounded w-full py-2 my-6">
            Sign up
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

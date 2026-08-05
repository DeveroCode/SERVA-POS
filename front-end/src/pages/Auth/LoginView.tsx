import LoginForm from "@/forms/LoginForm";
import { useUser } from "@/hooks/useUser";
import { useLoginUser } from "@/mutations/useMutationAuth";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USER_ROLES, type LoginUser } from "@/types/Index.types";

export default function LoginView() {
  const { mutate } = useLoginUser();
  const navigate = useNavigate();
  const methods = useForm<LoginUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, reset } = methods;
  const { data: user } = useUser();
  const handleSendForm = (data: LoginUser) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        if (user.role === USER_ROLES.OWNER) {
          navigate("/dashboard/general");
          return;
        }

        navigate("/dashboard");
      },
    });
  };

  return (
    <div className="space-y-2">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSendForm)} noValidate>
          <LoginForm />

          <section>
            <button className="bg-gray-200 transition-colors duration-75 hover:bg-orange-600 cursor-pointer text-white font-bold px-4 rounded w-full py-2 my-4">
              Sign In
            </button>

            <p className="text-center text-gray-400">Or</p>

            <div>
              <button className="border border-gray-300 shadow cursor-pointer capitalize px-4 rounded-md w-full py-2 my-4 flex items-center justify-center gap-2">
                <img
                  src="/logos/google.webp"
                  alt="google logo"
                  className="w-4"
                />
                sign in with google
              </button>
              <button className="border border-gray-300 shadow cursor-pointer capitalize px-4 rounded-md w-full py-2 my-4 flex items-center justify-center gap-2">
                <img src="/logos/apple.svg" alt="apple logo" className="w-4" />
                sign in with apple
              </button>
            </div>
          </section>
        </form>
      </FormProvider>
    </div>
  );
}

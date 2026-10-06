import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import { useFormContext } from "react-hook-form";
import type { LoginUser } from "types/Index.types";

export default function LoginForm() {
  const {register, formState: { errors } } = useFormContext<LoginUser>();
  return (
    <div className="space-y-6">
      <fieldset className="flex flex-col">
        <label htmlFor="email" className="font-semibold text-gray-700">
          Email
        </label>
        <input
          type="identifier"
          id="identifier"
          className="input-form"
          placeholder="Type your email or userKey"
          {...register("identifier", { required: "El email o userKey es obligatorio" })}
        />
        {errors.identifier && (
          <ErrorAlert>{errors.identifier.message}</ErrorAlert>
        )}
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="password" className="font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input-form"
          placeholder="Type your password"
          {...register("password", { required: "La password es obligatoria" })}
        />
        {errors.password && (
          <ErrorAlert>{errors.password.message}</ErrorAlert>
        )}
      </fieldset>
    </div>
  );
}

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
          type="email"
          id="email"
          className="input-form"
          placeholder="Type your email"
          {...register("email", { required: "The email field is required" })}
        />
        {errors.email && (
          <ErrorAlert>{errors.email.message}</ErrorAlert>
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
          {...register("password", { required: "The password field is required" })}
        />
        {errors.password && (
          <ErrorAlert>{errors.password.message}</ErrorAlert>
        )}
      </fieldset>
    </div>
  );
}

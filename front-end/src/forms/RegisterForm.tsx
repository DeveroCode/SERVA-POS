import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import { useFormContext } from "react-hook-form";
import type { RegisterForm } from "types/Index.types.ts";
import { USER_ROLES } from "../lib";

export default function RegisterForm() {
  const {register, formState: { errors } } = useFormContext<RegisterForm>();
  return (
    <div className="space-y-6">
      <fieldset className="flex flex-col">
        <label htmlFor="name" className="font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="input-form"
          placeholder="Type your name only your first name"
          {...register("name", { required: "The name field is required" })}
        />
        {errors.name && <ErrorAlert>{errors.name.message}</ErrorAlert>}
      </fieldset>
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
        {errors.email && <ErrorAlert>{errors.email.message}</ErrorAlert>}
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="role" className="font-semibold text-gray-700">
          Role
        </label>
        <select name="role" id="role" className="input-form" {...register("role", { required: "The role field is required" })}>
          <option value="">Select a role</option>
          {Object.entries(USER_ROLES).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.role && <ErrorAlert>{errors.role.message}</ErrorAlert>}
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
        {errors.password && <ErrorAlert>{errors.password.message}</ErrorAlert>}
      </fieldset>
    </div>
  );
}

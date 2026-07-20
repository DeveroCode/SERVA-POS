import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import { useFormContext } from "react-hook-form";
import type { UpdatePasswordForm } from "types/User.types";

export default function ChangePasswordForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdatePasswordForm>();
  return (
    <div className="space-y-3">
      <fieldset className="flex flex-col">
        <label
          htmlFor="currentPassword"
          className="font-semibold text-gray-700 text-sm"
        >
          Contraseña actual
        </label>
        <input
          type="password"
          id="currentPassword"
          className="input-form"
          placeholder="Ingresa tu contraseña actual"
          {...register("currentPassword", {
            required: "La contraseña actual es obligatoria",
          })}
        />
        {errors.password && <ErrorAlert>{errors.password.message}</ErrorAlert>}
      </fieldset>
      <fieldset className="flex flex-col">
        <label
          htmlFor="password"
          className="font-semibold text-gray-700 text-sm"
        >
          Nueva contraseña
        </label>
        <input
          type="password"
          id="password"
          className="input-form"
          placeholder="Ingresa tu nueva contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
        />
        {errors.password && <ErrorAlert>{errors.password.message}</ErrorAlert>}
      </fieldset>
    </div>
  );
}

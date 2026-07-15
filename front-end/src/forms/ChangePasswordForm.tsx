export default function ChangePasswordForm() {
  return (
    <div className="space-y-3">
      <fieldset className="flex flex-col">
        <label htmlFor="password" className="font-semibold text-gray-700 text-sm">
          Contraseña actual
        </label>
        <input
          type="password"
          id="password"
          className="input-form"
          placeholder="Ingresa tu contraseña actual"
          // {...register("password", { required: "The password field is required" })}
        />
        {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="password" className="font-semibold text-gray-700 text-sm">
          Nueva contraseña
        </label>
        <input
          type="password"
          id="password"
          className="input-form"
          placeholder="Ingresa tu nueva contraseña"
          // {...register("password", { required: "The password field is required" })}
        />
        {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
      </fieldset>
    </div>
  );
}

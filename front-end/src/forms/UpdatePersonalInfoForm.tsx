import LabelForm from "@/Components/Texts/LabelForm";

export default function UpdatePersonalInfoForm() {
  return (
    <div className="space-y-3">
      <fieldset className="flex gap-5">
        <div className="flex flex-col">
          <LabelForm section="name">nombre(s)</LabelForm>
          <input
            type="text"
            id="name"
            className="input-form"
            placeholder="Ingresa tu(s) nombre(s)"
            // {...register("password", { required: "The password field is required" })}
          />
          {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
        </div>
        <div className="flex flex-col">
          <LabelForm section="last_names">apellido(s)</LabelForm>
          <input
            type="text"
            id="last_names"
            className="input-form"
            placeholder="Ingresa tus apellidos"
            // {...register("password", { required: "The password field is required" })}
          />
          {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
        </div>
      </fieldset>
      <fieldset className="flex gap-5">
        <div className="flex flex-col">
          <LabelForm section="date">fecha de nacimiento</LabelForm>
          <input
            type="date"
            id="date"
            className="input-form w-52"
            // {...register("password", { required: "The password field is required" })}
          />
          {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
        </div>
        <div className="flex flex-col">
          <LabelForm section="phone">teléfono</LabelForm>
          <input
            type="tel"
            id="phone"
            className="input-form"
            placeholder="Ingresa tu número de teléfono"
            // {...register("password", { required: "The password field is required" })}
          />
          {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
        </div>
      </fieldset>
      <fieldset className="flex flex-col">
          <LabelForm section="email">correo eléctronico</LabelForm>
          <input
            type="email"
            id="email"
            className="input-form"
            placeholder="Ingresa tu correo eléctronico"
            // {...register("password", { required: "The password field is required" })}
          />
          {/* {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )} */}
        </fieldset>
    </div>
  );
}

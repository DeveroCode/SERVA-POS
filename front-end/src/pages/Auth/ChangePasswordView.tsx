import ChangePasswordForm from "@/forms/ChangePasswordForm";
import { Lock } from "lucide-react";

export default function ChangePasswordView() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-center items-center">
        <div className="border border-gray-500 p-3 rounded-lg">
          <Lock size={20} className="text-gray-800" />
        </div>

        <div className="text-center py-2">
          <h2 className="font-bold text-gray-900 text-xl">
            Cambiar contraseña
          </h2>
          <p className="text-xs text-gray-600">
            Coloca tu contraseña actual y selecciona una nueva
          </p>
        </div>
      </section>

      <form action="">
        <ChangePasswordForm />

        <button type="submit" className="transition-colors duration-75 bg-orange-600 cursor-pointer text-white font-bold px-4 rounded w-full py-2 my-6">
            Actualizar
          </button>
      </form>
    </div>
  );
}

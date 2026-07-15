import { Lock } from "lucide-react";
import { useState } from "react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Texts/InfoUpdate";
import ModalLayout from "../Modals/ModalLayout";
import ChangePasswordView from "@/pages/Auth/ChangePasswordView";
export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="second-card space-y-6">
        <section className="flex justify-between items-center">
          <div className="bg-orange-100/30 p-2 rounded-md">
            <Lock size={20} className="text-orange-600" />
          </div>

          <EnableModalBTN onClick={() => setOpen(true)} />
        </section>

        <InfoUpdate
          title="Cambiar Contraseña"
          description="Actualiza tu contraseña para proteger tu cuenta frente a accesos no autorizados."
        />

        <p className="text-sm text-gray-400">
          Última modificación hace 7 meses
        </p>
      </div>

      <ModalLayout open={open} setOpen={setOpen}>
        <ChangePasswordView />
      </ModalLayout>
    </>
  );
}

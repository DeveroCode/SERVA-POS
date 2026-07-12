import { ImagePlus } from "lucide-react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Text/InfoUpdate";

export default function CChangeImageProfile() {
  return (
    <div className="second-card space-y-6">
      <section className="flex justify-between items-center">
        <div className="bg-orange-100/30 p-2 rounded-md">
          <ImagePlus size={20} className="text-orange-600" />
        </div>

        <EnableModalBTN />
      </section>

      <InfoUpdate
        title="Cambiar foto de perfil"
        description="Sube una nueva foto de perfil para personalizar tu cuenta y ayudar a los demás a reconocerte."
      />
    </div>
  );
}

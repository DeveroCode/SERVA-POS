import UploadImageProfileForm from "@/forms/UploadImageProfileForm";
import { useUploadImageProfile } from "@/mutations/useMutationUser";
import { Image } from "lucide-react";

export default function UpdateImageProfileView() {
  const {mutate, isPending} = useUploadImageProfile();
  const handleUpload = (file: File) => {
    if(!file) return;
    mutate({image: file});
  };
  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-center items-center">
        <div className="border border-gray-500 p-3 rounded-lg">
          <Image size={20} className="text-gray-800" />
        </div>

        <div className="text-center py-2">
          <h2 className="font-bold text-gray-900 text-xl">Foto de perfil</h2>
          <p className="text-xs text-gray-600">
            Sube una nueva foto de perfil para personalizar tu cuenta y ayudar a
            los demás a reconocerte.
          </p>
        </div>
      </section>
       <form noValidate>
          <UploadImageProfileForm onFileSelected={handleUpload} loading={isPending} />
          <button
            type="submit"
            className="transition-colors duration-75 bg-orange-600 cursor-pointer text-white font-bold px-4 rounded w-full py-2 my-6"
          >
            Actualizar
          </button>
        </form>
    </div>
  );
}

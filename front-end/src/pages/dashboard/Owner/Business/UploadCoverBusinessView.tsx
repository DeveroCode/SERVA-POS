import UploadLogoBusinessForm from "@/forms/UploadLogoBusinessForm";
import { useUploadCoverBusiness } from "@/mutations/useMutationBusiness";
import type { Business } from "@/types/Business.types";
import { Image } from "lucide-react";
import { useParams } from "react-router-dom";

export default function  UploadCoverBusinessView() {
  const { businessId } = useParams<{ businessId: Business["_id"] }>();
  const { mutate, isPending } = useUploadCoverBusiness();
  const handleUpload = (file: File) => {
    if (!file) return;
    mutate({ image: file, _id: businessId });
  };
  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-center items-center">
        <div className="border border-gray-500 p-3 rounded-lg">
          <Image size={20} className="text-gray-800" />
        </div>

        <div className="text-center py-2">
          <h2 className="font-bold text-gray-900 text-xl">Cover de la empresa</h2>
          <p className="text-xs text-gray-600">
            Sube tu cover de empresa para que tus clientes puedan identificarte
            facilmente.
          </p>
        </div>
      </section>
      <form noValidate>
        <UploadLogoBusinessForm
          onFileSelected={handleUpload}
          loading={isPending}
        />
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

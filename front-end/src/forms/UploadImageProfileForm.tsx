import { ImagePlus } from "lucide-react";

export default function UploadImageProfileForm() {
  return (
    <div className="space-y-6">
      <label
        htmlFor="profile-image"
        className="
          group
          flex flex-col items-center justify-center
          w-full h-52
          rounded-2xl
          border-2 border-dashed border-orange-600/50
          bg-orange-50/40
          cursor-pointer
          transition-all duration-200
          hover:border-orange-600
          hover:bg-orange-50
        "
      >
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-orange-100 p-4 transition-transform duration-200 group-hover:scale-110">
            <ImagePlus
              size={32}
              className="text-orange-600"
            />
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-orange-600">
                Haz clic para subir
              </span>{" "}
              o arrastra una imagen aquí
            </p>

            <p className="text-xs text-gray-500">
              PNG, JPG o WEBP • Máximo 5 MB
            </p>
          </div>
        </div>

        <input
          id="profile-image"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>
  );
}
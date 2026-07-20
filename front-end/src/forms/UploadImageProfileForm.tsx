import { Image } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

type UploadImageProfileFormProps = {
  onFileSelected: (file: File) => void;
  loading?: boolean;
};

export default function UploadImageProfileForm({
  onFileSelected,
  loading,
}: UploadImageProfileFormProps) {
  const MAX_SIZE = 5 * 1024 * 1024;
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      if (file.size > MAX_SIZE) {
        return toast.error("El archivo es demasiado grande");
      }

      setFileName(file.name);
      onFileSelected(file);
    },
    [MAX_SIZE, onFileSelected, setFileName],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/jpg, image/png, image/jpeg, image/webp": [] },
  });
  return (
    <div
      {...getRootProps()}
      className={`
    group cursor-pointer rounded-2xl border-2 border-dashed
    transition-all duration-300
    ${
      isDragActive
        ? "border-orange-600 bg-orange-50"
        : "border-gray-300 bg-white hover:border-orange-500 hover:bg-orange-50/40"
    }
  `}
    >
      <input
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/webp"
        {...getInputProps()}
      />

      <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
        <div
          className={`
        flex h-20 w-20 items-center justify-center rounded-full
        transition-all duration-300
        ${
          isDragActive
            ? "bg-orange-100 text-orange-600"
            : "bg-gray-100 text-orange-600 group-hover:bg-orange-100"
        }
      `}
        >
          <Image size={38} strokeWidth={2} />
        </div>

        {loading ? (
          <>
            <p className="mt-6 text-lg font-semibold text-gray-800">
              Subiendo imagen...
            </p>

            <div className="mt-4 h-2 w-60 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-orange-600" />
            </div>
          </>
        ) : isDragActive ? (
          <>
            <h3 className="mt-6 text-lg font-semibold text-orange-600">
              Suelta la imagen aquí
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Libera el archivo para subir tu foto de perfil.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-6 text-lg font-semibold text-gray-800">
              Subir foto de perfil
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Arrastra y suelta una imagen aquí o{" "}
              <span className="font-semibold text-orange-600">
                selecciónala desde tu dispositivo
              </span>
            </p>
          </>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {["JPG", "PNG", "JPEG", "WEBP"].map((format) => (
            <span
              key={format}
              className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700"
            >
              {format}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Tamaño máximo recomendado: 5 MB
        </p>

        {fileName && !loading && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">
              ✓ Archivo seleccionado
            </p>

            <p className="mt-1 text-xs text-green-600 truncate max-w-xs">
              {fileName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

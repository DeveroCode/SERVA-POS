import CChangeImageProfile from "@/Components/Cards/CChangeImageProfile";
import ChangePassword from "@/Components/Cards/ChangePassword";
import CPersonalInformation from "@/Components/Cards/CPersonalInformation";
import CPreferenceCard from "@/Components/Cards/CPreferenceCard";

export default function SecurityProfileView() {
  return (
    <section className="w-full space-y-8">
      {/* Header */}
      <div className="border-b border-[#F3F4F6] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">
          Ajustes de seguridad
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4B5563]">
          Gestiona tus preferencias de autenticación, los cierres de sesión de
          los dispositivos activos y las protecciones de acceso para Serva POS.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChangePassword />
        <CPersonalInformation />
        <CChangeImageProfile />
        <CPreferenceCard />
      </div>
    </section>
  );
}

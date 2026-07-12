import CChangeImageProfile from '@/Components/Cards/CChangeImageProfile';
import ChangePassword from '@/Components/Cards/ChangePassword';
import CPersonalInformation from '@/Components/Cards/CPersonalInformation';
import CPreferenceCard from '@/Components/Cards/CPreferenceCard';

export default function SecurityProfileView() {

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased flex flex-col">
        <section className="space-y-8">
          {/* Section Header */}
          <div className="border-b border-[#F3F4F6] pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Ajustes de seguridad</h1>
            <p className="text-sm text-[#4B5563] mt-1">
              Gestiona tus preferencias de autenticación, los cierres de sesión de los dispositivos activos y las protecciones de acceso para Serva POS.
            </p>
          </div>

          {/* Interactive Security Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            <ChangePassword/>
            <CPersonalInformation/>
            <CChangeImageProfile/>
            <CPreferenceCard/>
          </div>
        </section>
    </div>
  );
}
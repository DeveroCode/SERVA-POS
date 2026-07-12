import CChangePassword from "@/Components/Cards/CChangePassword";
import CPersonalInfo from "@/Components/Cards/CPersonalInfo";
import CSettingProfile from "@/Components/Cards/CSettingProfile";
import CWorkInfo from "@/Components/Cards/CWorkInfo";
import { Link } from "react-router-dom";

export default function ProfileView() {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="w-full border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="rounded-full border border-gray-200 bg-gray-100 size-16 shadow-md flex items-center justify-center shrink-0">
          <span className="font-bold text-xl text-gray-600">CM</span>
        </div>

        <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-700">
              Carlos Martinez
            </h1>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-400">
              <span>Administrator</span>
              <span>Serva HQ</span>
              <span>Zona Centro</span>
            </div>
          </div>

          <Link
            to="/auth/login"
            className="self-start md:self-auto rounded-xl border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 shadow-sm transition hover:shadow-md"
          >
            Edit profile
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        <CPersonalInfo />
        <CWorkInfo />
        <CChangePassword />
        <CSettingProfile />
      </section>
    </div>
  );
}
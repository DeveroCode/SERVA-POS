import CChangePassword from "@/Components/Cards/CChangePassword";
import CPersonalInfo from "@/Components/Cards/CPersonalInfo";
import CSettingProfile from "@/Components/Cards/CSettingProfile";
import CWorkInfo from "@/Components/Cards/CWorkInfo";
import { useUser } from "@/hooks/useUser";
import { getUserInitials } from "@/lib/index";
import { Link } from "react-router-dom";

export default function ProfileView() {
  const { data: user } = useUser();
  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="flex flex-col gap-6 border-b border-gray-200 pb-6 lg:flex-row lg:items-center">
        <div className="rounded-full border border-gray-200 bg-gray-100 size-16 shadow-md flex items-center justify-center shrink-0">
          <>
            {user.image ? (
              <img
                src={user.image}
                alt="image profile user"
                className="w-15 h-15 rounded-full object-cover"
              />
            ) : (
              <div className="w-15 h-15 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {getUserInitials(user.name, user.last_name)}
                </span>
              </div>
            )}
          </>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-700 capitalize">
              {user.name} {user.last_name}
            </h1>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-400 capitalize">
              <span>{user.role}</span>
              <span>Serva HQ</span>
              <span>Zona Centro</span>
            </div>
          </div>

          <Link
            to="/auth/login"
            className="
  w-full sm:w-auto
  text-center
  rounded-xl
  border
  border-gray-200
  bg-white
  px-5
  py-2
  text-sm
  font-semibold
  text-gray-600
  shadow-sm
  hover:shadow-md"
          >
            Edit profile
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 py-8">
        <CPersonalInfo />
        <CWorkInfo />
        <CChangePassword />
        <CSettingProfile />
      </section>
    </div>
  );
}

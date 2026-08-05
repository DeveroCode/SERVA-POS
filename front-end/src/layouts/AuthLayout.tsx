import { Link, Outlet, useLocation } from "react-router-dom";
import CAuth from "@/Components/Carousels/CAuth";
import { getGreeting } from "../lib";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8">
      <main className="max-w-md w-full mx-auto">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <img
            src="/isotipo.png"
            alt="Serva"
            loading="lazy"
            className="w-12 h-12 object-contain"
          />

          <span className="font-bold uppercase tracking-wide text-2xl">
            Serva
          </span>
        </div>

        <section className="mb-10">
          <h2 className="text-5xl capitalize font-bold text-center lg:text-left">
            {getGreeting("es")}
          </h2>

          <p className="text-center lg:text-left text-gray-600">
            Don't have an account yet?{" "}
            <Link
              to={`${location.pathname === "/auth/login" ? "/auth/register" : "/auth/login"}`}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
             {location.pathname === "/auth/login" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </section>

        <Outlet />

      </main>
      <section className="hidden lg:flex justify-center">
        <CAuth />
      </section>

    </div>
  );
}
import { useUser } from "@/hooks/useUser";
import Loader from "../pages/Loader";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const { data: user, isPending } = useUser();

  if (isPending) {
    // toast.error("Cargando...");
    return <Loader/>;
  }

  if (!user) {
    // toast.error("Debes iniciar sesión");
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

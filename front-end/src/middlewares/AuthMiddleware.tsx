import { useUser } from "@/hooks/useUser";
import Loader from "../pages/Loader";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthMiddleware() {
  const { data: user, isPending } = useUser();
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Por favor inicie sesión para ver esta página");
    return <Navigate to="/auth/login" />;
  }

  if (isPending) {
    return <Loader/>;
  }

  if (!user) {
    toast.error("Por favor inicie sesión para ver esta página");
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

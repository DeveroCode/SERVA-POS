import { useUser } from "@/hooks/useUser";
import Loader from "@/pages/Loader";
import { MEMBER_ROLES } from "@/types/BusinessMember.type";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashboardRedirect() {
  const { data: user, isPending, isError } = useUser();

  if (isPending) {
    toast.info("Cargando...");
    return <Loader />;
  }

  if (isError || !user) {
    toast.error("Debes iniciar sesión");
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role === MEMBER_ROLES.OWNER) {
    toast.success(`Bienvenido, ${user.name}`);
    return <Navigate to="/dashboard" replace />;
  }

  toast.success(`Bienvenido, ${user.name}`);
  return <Navigate to="/branches" replace />;
}
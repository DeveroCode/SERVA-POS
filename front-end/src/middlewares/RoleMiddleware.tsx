import { useUser } from "@/hooks/useUser";
import Loader from "@/pages/Loader";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import type { UserRoles } from "types/User.types";
type RoleMiddlewareProps = {
  allowedRoles: UserRoles[];
};

export default function RoleMiddleware({ allowedRoles }: RoleMiddlewareProps) {
  const { data: user, isPending } = useUser();

  if (isPending) return <Loader />;

  if (!user) {
    toast.error("Por favor inicia sesión.");
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.error("No tienes permiso para ver esta página");
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

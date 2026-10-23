
import { useUser } from "@/hooks/useUser";
import Loader from "@/pages/Loader";
import type { JwtPayload } from "@/services/AuthService";
import { GET_TOKEN_KEY } from "@/utils/key";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashboardRedirect() {
    const { data: user, isPending, isError } = useUser();
    const token = localStorage.getItem(GET_TOKEN_KEY);

    if (isPending) {
        return <Loader />;
    }

    if (isError || !user || !token) {
        return <Navigate to="/auth/login" replace />;
    }

    let type: JwtPayload["type"] | undefined;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        type = decoded.type;
    } catch {
        return <Navigate to="/auth/login" replace />;
    }

    if (type === "owner") {
        return <Navigate to="/dashboard" replace />;
    }

    if (type === "employee") {
        return <Navigate to="/branch" replace />;
    }

    toast.success(`Bienvenido ${user.name}`);
    return <Navigate to="/auth/login" replace />;
}

import CBusiness from "@/Components/Cards/Business/CBusiness";
import { useBusiness } from "@/hooks/useBusiness";
import Loader from "@/pages/Loader";
import type { Business } from "@/types/Index.types";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BusinessView() {
  const { businessId } = useParams<{ businessId: Business["_id"] }>();
  const {
    data: business,
    isError,
    isPending,
  } = useBusiness(businessId as Business["_id"]);

  if (isPending) return <Loader />;
  if (isError) {
    toast.error("Business no encontrado o no te pertenece");
    return <Navigate to="/dashboard/general" replace />;
  }

  if (!businessId) {
    return <Navigate to="/dashboard/general" replace />;
  }
  return (
    <>
      <CBusiness business={business} />
    </>
  );
}

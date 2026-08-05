import { ASideLink } from "@/data/ASide";
import { OwnerAside } from "@/data/OwnerAside";
import AdminSidebarLink from "../Links/AdminSidebarLink";
import { useUser } from "@/hooks/useUser";
import { USER_ROLES } from "@/types/User.types";
import { useParams } from "react-router-dom";
import type { Business } from "@/types/Business.types";
import { Building2 } from "lucide-react";
import { useBusiness } from "@/hooks/useBusiness";

export default function AdminAside() {
  const { data: user } = useUser();
  const { businessId } = useParams<{ businessId: Business["_id"] }>();
  const { data: business } = useBusiness(businessId as Business["_id"]);

  const sidebarItems = user?.role === USER_ROLES.OWNER ? OwnerAside : ASideLink;

  return (
    <aside className="w-64 shrink-0 p-6 bg-white">
      <nav className="flex flex-col gap-2 space-y-3">
        {sidebarItems.map((item, i) => (
          <AdminSidebarLink key={i} item={item} />
        ))}

        {business && (
          <>
            <div className="my-2 border-t border-slate-200" />

            <AdminSidebarLink
              item={{
                type: "link",
                title: business.name,
                url: `/dashboard/business/${business._id}`,
                icon: <Building2 size={24} />,
              }}
              className="text-sm font-normal"
            />
          </>
        )}
      </nav>
    </aside>
  );
}

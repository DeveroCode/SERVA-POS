import { ASideLink } from "@/data/ASide";
import { OwnerAside } from "@/data/OwnerAside";
import { useUser } from "@/hooks/useUser";
import { USER_ROLES } from "@/types/User.types";
import { useLocation, useParams } from "react-router-dom";
import { Building2, GitBranch, Users } from "lucide-react";
import { useBusiness } from "@/hooks/useBusiness";
import { useEffect } from "react";
import type { Business } from "@/types/Business.types";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import AdminSidebarLink from "../Links/AdminSidebarLink";


export default function AdminAside() {
  const { data: user } = useUser();
  const { businessId } = useParams<{ businessId: Business["_id"] }>();
  const location = useLocation();

  /**
   * If we're inside a business, we use the URL ID.
   * Otherwise, we retrieve the last business visited using the key.
   */
  const lastBusinessId =
    businessId || localStorage.getItem(LAST_BUSINESS_KEY) || undefined;
  const { data: business } = useBusiness(lastBusinessId as Business["_id"]);

  /**
   * Every time we enter a different business, we replace the last saved business
   */
  useEffect(() => {
    if (businessId) {
      localStorage.setItem(LAST_BUSINESS_KEY, businessId);
    }
  }, [businessId]);
  const sidebarItems = user?.role === USER_ROLES.OWNER ? OwnerAside : ASideLink;

  /** We determine whether we are currently operating within the business */
  const isInsideBusiness =
    !!businessId &&
    location.pathname.startsWith(`/dashboard/business/${businessId}`);

 return (
    <aside className="w-64 shrink-0 bg-white p-6">
      <nav className="flex flex-col gap-2 space-y-3">
        {sidebarItems.map((item, i) => (
          <AdminSidebarLink
            key={i}
            item={item}
          />
        ))}

        {business && (
          <>
            <div className="my-2 border-t border-slate-200" />

            {/* BUSINESS */}
            <AdminSidebarLink
              item={{
                type: "link",
                title: business.name,
                url: `/dashboard/business/${business._id}`,
                icon: <Building2 size={24} />,
              }}
              className="text-sm font-normal"
              exact
            />

            {/* OPCIONES DEL BUSINESS */}
            {isInsideBusiness && (
              <div className="ml-4 flex flex-col gap-1 border-l border-slate-200 pl-2">
                <AdminSidebarLink
                  item={{
                    type: "link",
                    title: "Sucursales",
                    url: `/dashboard/business/${business._id}/branches`,
                    icon: <GitBranch size={20} />,
                  }}
                  className="text-sm"
                />

                <AdminSidebarLink
                  item={{
                    type: "link",
                    title: "Personal",
                    url: `/dashboard/business/${business._id}/personnel`,
                    icon: <Users size={20} />,
                  }}
                  className="text-sm"
                />
              </div>
            )}
          </>
        )}
      </nav>
    </aside>
  );
}

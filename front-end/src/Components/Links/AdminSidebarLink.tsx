import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "types/Index.types";

type AdinSidebarLink = {
  item: SidebarItem;
};

export default function AdminSidebarLink({ item }: AdinSidebarLink) {
  const location = useLocation();
  const isActive = location.pathname === item.url;
  return (
    <div>
      <Link
        to={item.url}
        className={`
        flex
        items-center
        gap-3
        px-4
        py-2
        transition-all
        ${
          isActive
            ? "border-l-2 border-orange-600 text-orange-600 font-bold bg-orange-100/30 rounded-tr-md rounded-br-md"
            : "text-gray-500 hover:bg-gray-100"
        }
    `}
      >
        {item.icon}

        <span>{item.title}</span>
      </Link>
    </div>
  );
}

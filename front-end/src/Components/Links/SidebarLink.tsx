import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "types/Index.types";

type SidebarLinkProps = {
  item: SidebarItem;
};

export default function SidebarLink({ item }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <div className="relative w-full h-16 flex items-center justify-center">
      <Link
        to={item.url}
        className={`
          relative flex items-center justify-center transition-all duration-300 ease-in-out
          ${isActive
            ? "bg-white text-black h-10 w-10 rounded-full shadow-md z-20 scale-110"
            : "text-white hover:text-gray-200 h-12 w-12 rounded-full hover:bg-orange-700/50"
          }
        `}
      >
        <div className="w-6 h-6 flex items-center justify-center shrink-0 z-10">
          {item.icon}
        </div>
      </Link>
    </div>
  );
}
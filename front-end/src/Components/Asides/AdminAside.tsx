import { ASideLink } from "@/data/ASide";
import AdminSidebarLink from "../Links/AdminSidebarLink";

export default function AdminAside() {
  return (
    <aside
      className="
        w-64
        shrink-0
        p-6
        bg-white
    "
    >
      <nav className="flex flex-col gap-2 space-y-3">
        {ASideLink.map((item, i) => (
          <AdminSidebarLink key={i} item={item} />
        ))}
      </nav>
    </aside>
  );
}

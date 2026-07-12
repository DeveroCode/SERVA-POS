import { DAsideLinks, DUAside } from "@/data/DAside";
import SidebarLink from "../Links/SidebarLink";

export default function DAside() {
  return (
    <aside className="bg-orange-600 h-full flex flex-col justify-between py-8 w-20 rounded-xl relative">
      <nav aria-label="Navegación principal" className="w-full">
        <ul className="flex flex-col gap-2">
          {DAsideLinks.map((item) => (
            <li key={item.url} className="w-full">
              <SidebarLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Configuración y cuenta" className="w-full">
        <ul className="flex flex-col gap-2">
          {DUAside.map((item) => (
            <li key={item.url} className="w-full">
              <SidebarLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
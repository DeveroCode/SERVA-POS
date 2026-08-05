import { useBusinesses } from "@/hooks/useBusinesses";
import { BusinessCardItem } from "./BusinessCardItem";
import { EmptySlotCard } from "./EmptySlotCard";

export default function BusinessCard() {
  const { data: businesses } = useBusinesses();
  const maxBusinesses = 3;
  const emptySlotsCount = Math.max(0, maxBusinesses - businesses.length);

  return (
    <div className="w-full font-sans text-slate-900">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Mis Negocios
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Gestiona los perfiles y la configuración general de tus establecimientos.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
            {businesses.length} de {maxBusinesses} slots utilizados
          </span>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render Existing Businesses */}
        {businesses.map((business) => (
          <BusinessCardItem key={business._id} business={business} />
        ))}

        {/* Render Empty Placeholders */}
        {Array.from({ length: emptySlotsCount }).map((_, index) => (
          <EmptySlotCard key={`empty-slot-${index}`} />
        ))}
      </div>
    </div>
  );
}

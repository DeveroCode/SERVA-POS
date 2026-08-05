import type { Business } from "@/types/Index.types"

type CoverHeaderBusinessProps = {
  business: Business
}

export default function CoverHeaderBusiness({ business }: CoverHeaderBusinessProps) {
  return (
   <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-gray-900">
            <img
              src={`${business?.coverImage ? business.coverImage : '/background-example.jpg'}`}
              loading="lazy"
              alt="Business Cover"
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Status Badge Top Right */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-800 tracking-wide uppercase">
                {business.slug}
              </span>
            </div>
          </div>
  )
}

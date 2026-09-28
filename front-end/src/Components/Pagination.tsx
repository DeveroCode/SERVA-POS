import type { paginationType } from "@/types/Pagination.type";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  pagination?: paginationType;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages } = pagination;

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-100 text-slate-600 font-sans select-none">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={!hasPreviousPage}
        aria-label="Página anterior"
        className="p-1.5 transition-all cursor-pointer duration-200 disabled:cursor-not-allowed"
      >
        <ChevronLeft
          className={`w-5.5 h-5.5 transition-colors duration-200 ${
            hasPreviousPage ? "text-orange-700" : "text-slate-200"
          }`}
        />
      </button>

      <div className="min-w-14 text-center text-xs font-semibold text-slate-600">
        {page} de {totalPages}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!hasNextPage}
        aria-label="Página siguiente"
        className="p-1.5 cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight
          className={`w-5.5 h-5.5 transition-colors duration-200 ${
            hasNextPage ? "text-orange-700" : "text-slate-200"
          }`}
        />
      </button>
    </div>
  );
}

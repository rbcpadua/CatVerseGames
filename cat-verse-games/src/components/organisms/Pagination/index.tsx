import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  showProgressBar?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  showProgressBar = true,
}: PaginationProps) => {
  return (
    <div className="sticky bottom-0 bg-base-100 border-t border-base-300 p-4 space-y-3">
      {showProgressBar && (
        <div className="w-full bg-slate-300 dark:bg-slate-600 rounded-full h-1 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{
              width: `${((currentPage + 1) / totalPages) * 100}%`,
            }}
          />
        </div>
      )}
      <div className="text-center text-sm text-base-content/70 gap-2 flex items-center justify-center">
        Página
        <span className="font-semibold text-base-content ml-1">
          {currentPage + 1}
        </span>
        de
        <span className="font-semibold text-base-content ml-1">
          {totalPages}
        </span>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={onPrevious}
          disabled={currentPage === 0}
          className="btn btn-outline btn-sm gap-2"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className="btn btn-outline btn-sm gap-2"
          aria-label="Próxima página"
        >
          Próxima
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

import { X } from "lucide-react";
import { useState } from "react";
import type { Game } from "@strategies/types/selectorGameTypes";
import { Card } from "@components/molecules";
import { Pagination } from "@components/organisms";

interface GamesModalResultProps {
  games: Game[];
  isOpen: boolean;
  onClose: () => void;
}

export const GamesModalResult = ({
  games,
  isOpen,
  onClose,
}: GamesModalResultProps) => {
  const GAMES_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(games.length / GAMES_PER_PAGE);
  const startIndex = currentPage * GAMES_PER_PAGE;
  const endIndex = startIndex + GAMES_PER_PAGE;
  const currentGames = games.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isOpen || games.length === 0) return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95">
        <div className="sticky top-0 bg-base-100 border-b border-base-300 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-base-content">
            Jogos Encontrados
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 custom-scrollbar">
          <div className="grid grid-cols-1 gap-4 w-full pb-4">
            {currentGames.map((game) => (
              <a
                key={game.id}
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block transition-transform hover:scale-[1.01]"
              >
                <Card item={game} />
              </a>
            ))}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
          showProgressBar={true}
        />
      </div>
    </div>
  );
};

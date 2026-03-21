import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Monitor, Globe, Search, ArrowLeft } from "lucide-react";

import { useGameDiscovery } from "@hooks/useGameDiscovery";
import { useAudio } from "@context/AudioContext";
import { genresOptions } from "@strategies/constants/genresOptions";
import {
  BalancedPerformanceStrategy,
  GenreFocusStrategy,
} from "@strategies/gamesStrategies";
import { PageContainer } from "@components/templates";
import SpecSelector from "@components/molecules";
import { Modal } from "@components/atoms";

import type { Game } from "@strategies/types/selectorGameTypes";
import { GamesModalResult } from "./GamesModalResult";

const MenuGameSelection = () => {
  const { fetchGames, loading } = useGameDiscovery();
  const { playClickSound, playSliderSound } = useAudio();

  const [genres, setGenres] = useState<string[]>(["sports"]);
  const [platform, setPlatform] = useState("pc");
  const [ram, setRam] = useState(8);

  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const platforms = useMemo(() => ["PC", "Navegador", "Ambos"], []);

  const visibleGenres = useMemo(
    () => (showAllGenres ? genresOptions : genresOptions.slice(0, 7)),
    [showAllGenres],
  );

  const toggleGenre = useCallback(
    (id: string) => {
      playClickSound();
      setGenres((prev) =>
        prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
      );
    },
    [playClickSound],
  );

  const handleSearch = useCallback(async () => {
    if (genres.length === 0) {
      setUserFeedback(
        "Por favor, escolha pelo menos um gênero para nossa busca!",
      );
      setIsAlertModalOpen(true);
      return;
    }

    const allGames = await fetchGames(genres, platform);

    if (!allGames || allGames.length === 0) {
      setUserFeedback(
        `Não encontramos nenhum jogo de ${genres.join(", ")} para ${platform === "pc" ? "PC" : "Navegador"} na nossa galáxia.`,
      );
      setIsAlertModalOpen(true);
      return;
    }

    const strategyToUse =
      genres.length === 1 ? GenreFocusStrategy : BalancedPerformanceStrategy;
    const filtered = strategyToUse.filter(allGames, ram, genres[0]);

    if (filtered.length === 0) {
      const feedbackMsg =
        strategyToUse.name === "Foco no Gênero"
          ? `Encontramos jogos de ${genres[0]}, mas nenhum roda com apenas ${ram}GB de RAM.`
          : `Sua configuração atual (${ram}GB RAM) é insuficiente para rodar os jogos de ${genres.join(", ")} encontrados.`;

      setUserFeedback(feedbackMsg);
      setIsAlertModalOpen(true);
      return;
    }

    setFilteredGames(filtered);
    setIsModalOpen(true);
  }, [fetchGames, genres, platform, ram]);

  return (
    <PageContainer>
      <div className="flex flex-col mt-10 mb-4 gap-6 max-w-2xl w-full animate-fadeIn">
        <Link
          to="/"
          onClick={playClickSound}
          className="flex items-center gap-2 btn btn-ghost btn-md text-primary hover:bg-primary hover:text-white w-fit"
        >
          <ArrowLeft size={18} />
          <span>Voltar para Home</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl mx-auto card bg-base-100 border border-base-300 shadow-md p-4 sm:p-8 space-y-8">
        <section className="space-y-4">
          <div className="flex sm:flex-wrap items-baseline justify-between text-2xl font-bold text-primary/80 border-b border-base-200 pb-2">
            <span>Escolha os gêneros</span>

            {genres.length > 0 && (
              <button
                onClick={() => {
                  playClickSound();
                  setGenres([]);
                }}
                className="btn btn-ghost btn-xs text-error hover:bg-error/10 normal-case"
              >
                Limpar seleção
              </button>
            )}
          </div>
          <div className="badge badge-dash badge-primary">
            {genres.length} gênero(s) selecionado(s)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleGenres.map((genreOption) => {
              const isSelected = genres.includes(genreOption.id);
              return (
                <button
                  key={genreOption.id}
                  onClick={() => toggleGenre(genreOption.id)}
                  className={`btn h-16 rounded-xl border-2 normal-case font-medium transition-all w-full px-4 ${
                    isSelected
                      ? "btn-primary border-primary shadow-md scale-[1.02]"
                      : "btn-outline border-base-300 text-base-content/70 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-xl flex-shrink-0 self-start mt-0.5">
                        {genreOption.icon}
                      </span>

                      <span className="whitespace-normal text-left text-sm leading-tight flex-1">
                        {genreOption.label}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="badge badge-primary badge-sm border-none bg-white/20 ml-2">
                        ✓
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => {
                playClickSound();
                setShowAllGenres(!showAllGenres);
              }}
              className={`btn w-full h-16 btn-ghost border-primary rounded-xl border-2 text-primary transition-all
    ${showAllGenres ? "md:col-span-3" : "md:col-span-2"} 
    col-span-1`}
            >
              {showAllGenres ? "Ver menos gêneros" : "Ver mais gêneros..."}
            </button>
          </div>
        </section>

        <div className="divider opacity-10"></div>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary/80">Onde você joga?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {platforms.map((name) => {
              const id =
                name === "Navegador"
                  ? "browser"
                  : name === "Ambos"
                    ? "all"
                    : "pc";
              const isSelected = platform === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    playClickSound();
                    setPlatform(id);
                  }}
                  className={`btn h-14 rounded-full border-2 gap-2 w-full ${
                    isSelected
                      ? "btn-primary shadow-md"
                      : "btn-outline border-base-300 text-base-content/70"
                  }`}
                >
                  {id === "pc" && <Monitor size={18} />}
                  {id === "browser" && <Globe size={18} />}
                  {name}
                </button>
              );
            })}
          </div>
        </section>

        <div className="divider opacity-10"></div>

        <SpecSelector
          title="Quanto de RAM você tem?"
          value={ram}
          onClick={() => playSliderSound(ram)}
          onChange={setRam}
          labels={["2GB", "8GB", "16GB", "24GB", "32GB"]}
        />

        <div className="space-y-4 pt-4">
          <button
            onClick={() => {
              playClickSound();
              handleSearch();
            }}
            disabled={loading}
            className="btn btn-primary btn-lg w-full rounded-full text-xl shadow-xl hover:shadow-primary/30 gap-3"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Search size={22} /> Explorar jogos
              </>
            )}
          </button>
        </div>
      </div>

      <GamesModalResult
        games={filteredGames}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Modal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Poxa, que Pena!"
        variant="warning"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-6xl">😿</div>
          <p className="text-lg">{userFeedback}</p>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default MenuGameSelection;

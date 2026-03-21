import { useState, useCallback, useMemo } from "react"; //
import { useGameDiscovery } from "@hooks/useGameDiscovery";
import { useAudio } from "@context/AudioContext";
import type { Game } from "@strategies/types/selectorGameTypes";
import { Link } from "react-router-dom";
import {
  Monitor,
  Globe,
  Search,
  Lightbulb,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { genresOptions } from "@strategies/constants/genre";
import { PageContainer, GamesModalResult } from "@components/templates";
import SpecSelector from "@components/molecules";
import { BalancedPerformanceStrategy } from "@strategies/GamesStrategies";

const MenuGameSelection = () => {
  const { fetchGames, loading } = useGameDiscovery();
  const { playClickSound, playSliderSound } = useAudio();

  // States
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [ram, setRam] = useState(8);
  const [genre, setGenre] = useState("mmo");
  const [platform, setPlatform] = useState("pc");

  const platforms = useMemo(() => ["PC", "Navegador", "Ambos"], []);

  const activeStrategy = BalancedPerformanceStrategy;

  const handleSearch = useCallback(async () => {
    setHasSearched(true);
    setUserFeedback(null);
    setFilteredGames([]);

    const allGames = await fetchGames(genre, platform);

    if (allGames.length === 0) {
      setUserFeedback(
        "Nenhum jogo encontrado na base de dados para esses filtros.",
      );
      return;
    }

    const filtered = activeStrategy.filter(allGames, ram, genre);

    if (filtered.length === 0) {
      setUserFeedback(
        `O modo "${activeStrategy.name}" não encontrou jogos compatíveis com ${ram}GB de RAM para ${genre}.`,
      );
      return;
    }

    setFilteredGames(filtered);
    setIsModalOpen(true);
  }, [fetchGames, genre, platform, ram, activeStrategy]); //

  return (
    <PageContainer>
      <div className="flex flex-col mb-6">
        <Link
          to="/"
          onClick={() => {
            playClickSound();
          }}
          className="flex items-center gap-2 btn btn-ghost btn-md text-primary hover:bg-primary hover:text-white"
        >
          <ArrowLeft size={18} />
          <span>Voltar para Home</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl mx-auto card bg-base-100 border border-base-300 shadow-md p-4 sm:p-8 space-y-8">
        <h2 className="text-2xl font-bold text-primary/80 border-b border-base-200 pb-2">
          Escolha os gêneros
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {genresOptions.map((genreOption) => (
            <button
              key={genreOption.id}
              onClick={() => {
                playClickSound();
                setGenre(genreOption.id);
              }}
              className={`btn h-16 rounded-xl border-2 gap-4 normal-case font-medium transition-all w-full ${
                genre === genreOption.id
                  ? "btn-primary border-primary shadow-md scale-[1.02]"
                  : "btn-outline border-base-300 text-base-content/70 hover:border-primary/50"
              }`}
            >
              <span className="text-xl">{genreOption.icon}</span>
              {genreOption.label}
            </button>
          ))}
        </section>

        <div className="divider opacity-10"></div>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-primary/80">Onde você joga?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {platforms.map((platformName) => {
              const id =
                platformName.toLowerCase() === "navegador"
                  ? "browser"
                  : platformName.toLowerCase() === "ambos"
                    ? "all"
                    : "pc";
              return (
                <button
                  key={id}
                  onClick={() => {
                    playClickSound();
                    setPlatform(id);
                  }}
                  className={`btn h-14 rounded-full border-2 gap-2 w-full ${
                    platform === id
                      ? "btn-primary border-primary shadow-md"
                      : "btn-outline border-base-300 text-base-content/70"
                  }`}
                >
                  {id === "pc" ? <Monitor size={18} /> : <Globe size={18} />}
                  {platformName}
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
          {!hasSearched && (
            <div className="alert alert-info shadow-sm gap-2 bg-info/10 border-info/20">
              <Lightbulb size={20} className="text-info" />
              <div className="flex-1">
                <p className="text-sm font-medium text-base-content">
                  Selecione suas preferências e descubra seu próximo jogo! 🎮
                </p>
              </div>
            </div>
          )}

          {hasSearched && userFeedback && filteredGames.length === 0 && (
            <div className="alert alert-warning shadow-sm gap-2">
              <AlertTriangle size={20} />
              <p className="text-sm font-medium">{userFeedback}</p>
            </div>
          )}

          <button
            onClick={() => {
              playClickSound();
              handleSearch();
            }}
            disabled={loading}
            className="btn btn-primary btn-lg w-full rounded-full text-xl shadow-xl hover:shadow-primary/30 transition-all gap-3"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Search size={22} />
                Explorar jogos
              </>
            )}
          </button>
        </div>

        <GamesModalResult
          games={filteredGames}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </PageContainer>
  );
};

export default MenuGameSelection;

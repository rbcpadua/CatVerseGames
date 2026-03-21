import { Link } from "react-router-dom";
import { ThemeSelector } from "@components/atoms";
import { PageContainer } from "@components/templates";
import { useAudio } from "@context/AudioContext";

export const Home = () => {
  const { playClickSound } = useAudio();
  return (
    <PageContainer>
      <div className="absolute top-6 right-6 z-50">
        <ThemeSelector />
      </div>

      <main className="flex flex-col items-center text-center justify-center space-y-8 max-w-2xl w-full animate-fadeIn">
        <header className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-black text-primary tracking-tighter leading-none">
            CatVerse <span className="inline-block animate-bounce">🐱</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-80 text-base-content">
            Seu próximo jogo favorito está a um clique. 🚀
          </p>
        </header>

        <div className="w-full max-w-lg">
          <div className="card bg-base-200 shadow-2xl border border-base-300 p-8 backdrop-blur-md bg-opacity-90">
            <p className="mb-8 text-lg text-base-content">
              Explore nossa biblioteca filtrando por sua{" "}
              <strong className="text-primary">Memória RAM</strong> e seus{" "}
              <strong className="text-primary">Gêneros</strong> favoritos.
            </p>
            <Link
              to="/selection"
              onClick={playClickSound}
              className="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              Começar Agora
            </Link>
          </div>
        </div>

        <footer className="text-sm opacity-50 font-mono mt-4">
          Desenvolvido por Rebeca Sato com Strategy Pattern & DaisyUI
        </footer>
      </main>
    </PageContainer>
  );
};

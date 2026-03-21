import { Link } from "react-router-dom";
import { PageContainer } from "@components/templates";
import { useAudio } from "@context/AudioContext";
import { Header } from "@components/organisms";

export const Home = () => {
  const { playClickSound } = useAudio();
  return (
    <PageContainer>
      <main className="flex flex-col items-center text-center justify-center space-y-8 max-w-2xl w-full animate-fadeIn">
        <Header />

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

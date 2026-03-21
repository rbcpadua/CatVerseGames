import { Sun, Moon, Music, VolumeOff } from "lucide-react";
import { useTheme } from "@context/ThemeContext";
import { useAudio } from "@context/AudioContext";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const { isMusicEnabled, toggleMusic } = useAudio();

  const themes = [
    { id: "light", icon: <Sun size={16} />, label: "Light" },
    { id: "dark", icon: <Moon size={16} />, label: "Dark" },
  ];

  return (
    <div className="flex gap-2 items-center">
      <div className="flex bg-base-300 p-1 rounded-full gap-1 shadow-md border border-base-content/10">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`btn btn-circle btn-sm border-none transition-all ${
              theme === t.id ? "btn-primary text-white scale-110" : "btn-ghost"
            }`}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>

      <button
        onClick={toggleMusic}
        className={`btn btn-circle btn-sm border-none transition-all ${
          isMusicEnabled ? "btn-primary text-white" : "btn-ghost"
        }`}
        title={isMusicEnabled ? "Desabilitar Música" : "Habilitar Música"}
      >
        {isMusicEnabled ? <Music size={16} /> : <VolumeOff size={16} />}
      </button>
    </div>
  );
};

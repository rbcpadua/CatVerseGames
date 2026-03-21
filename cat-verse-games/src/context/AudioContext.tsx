import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMusicEnabled: boolean;
  toggleMusic: () => void;
  playClickSound: () => void;
  playSliderSound: (value: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(() => {
    return localStorage.getItem("musicEnabled") !== "false";
  });
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!bgAudioRef.current) {
      const bgAudio = new Audio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      );
      bgAudio.loop = true;
      bgAudio.volume = 0.1;
      bgAudioRef.current = bgAudio;
    }
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      if (bgAudioRef.current && isMusicEnabled) {
        bgAudioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    return () => window.removeEventListener("click", handleUserInteraction);
  }, [isMusicEnabled]);

  useEffect(() => {
    if (hasUserInteracted && bgAudioRef.current && isMusicEnabled) {
      bgAudioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    } else if (bgAudioRef.current && !isMusicEnabled) {
      bgAudioRef.current.pause();
    }
  }, [isMusicEnabled, hasUserInteracted]);

  const toggleMusic = () => {
    const newState = !isMusicEnabled;
    setIsMusicEnabled(newState);
    localStorage.setItem("musicEnabled", String(newState));

    if (bgAudioRef.current) {
      if (newState) {
        bgAudioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      } else {
        bgAudioRef.current.pause();
      }
    }
  };

  const playClickSound = () => {
    if (!isMusicEnabled) return;

    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const now = audioContext.currentTime;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.log("Audio playback not available");
    }
  };

  const playSliderSound = (value: number) => {
    if (!isMusicEnabled) return;

    try {
      const audioCtx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const freq = 400 + value * 10;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.log("Slider audio error", e);
    }
  };

  return (
    <AudioContext.Provider
      value={{ isMusicEnabled, toggleMusic, playClickSound, playSliderSound }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio deve ser usado dentro de um AudioProvider");
  }
  return context;
};

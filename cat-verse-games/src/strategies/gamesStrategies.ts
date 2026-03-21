import type { GameSelectionStrategy } from "./types/selectorGameTypes";

export const parseRAMString = (ramString: string): number => {
  if (!ramString) return 0;

  const cleanString = ramString.replace(/\s/g, "").toLowerCase();

  const match = cleanString.match(/(\d+)/);

  if (match) {
    let value = parseInt(match[1], 10);

    if (cleanString.includes("mb") && value > 100) {
      return Math.ceil(value / 1024);
    }

    return value;
  }

  return 0;
};

export const BalancedPerformanceStrategy: GameSelectionStrategy = {
  name: "Equilibrado",
  filter: (games, userRam, _genre) => {
    return games.filter((game) => {
      if (!game.minimum_system_requirements?.memory) return true;

      const reqRAM = parseRAMString(game.minimum_system_requirements.memory);

      return reqRAM <= userRam;
    });
  },
};

export const GenreFocusStrategy: GameSelectionStrategy = {
  name: "Foco no Gênero",
  filter: (games, ramInput, selectedGenre) => {
    if (!selectedGenre) return [];

    return games.filter((game) => {
      const gameRamStr = game.minimum_system_requirements?.memory || "";
      const requiredRam = parseRAMString(gameRamStr);

      return requiredRam <= ramInput;
    });
  },
};

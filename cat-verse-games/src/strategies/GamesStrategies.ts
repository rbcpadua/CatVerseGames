import type { GameSelectionStrategy } from "./types/selectorGameTypes";

const parseRAMString = (ramString: string | undefined): number => {
  if (!ramString) return 0;
  const matched = ramString.match(/(\d+)\s*(?:GB|mb)/i);
  if (matched && matched[1]) {
    const ram = parseInt(matched[1], 10);
    return ramString.toLowerCase().includes("mb") ? ram / 1024 : ram;
  }
  return 0;
};

export const LowEndPCStrategy: GameSelectionStrategy = {
  name: "PC de Entrada",
  filter: (games, ramInput, selectedGenre) => {
    return games.filter((game) => {
      if (
        selectedGenre &&
        game.genre.toLowerCase() !== selectedGenre.toLowerCase()
      )
        return false;

      const reqRAM = parseRAMString(game.minimum_system_requirements?.memory);

      return reqRAM <= ramInput && reqRAM < 8;
    });
  },
};

export const BalancedPerformanceStrategy: GameSelectionStrategy = {
  name: "Desempenho Equilibrado",
  filter: (games, ramInput, selectedGenre) => {
    return games.filter((game) => {
      if (
        selectedGenre &&
        game.genre.toLowerCase() !== selectedGenre.toLowerCase()
      )
        return false;

      const reqRAM = parseRAMString(game.minimum_system_requirements?.memory);

      return reqRAM <= ramInput;
    });
  },
};

export const GenreFocusStrategy: GameSelectionStrategy = {
  name: "Foco no Gênero",
  filter: (games, ramInput, selectedGenre) => {
    if (!selectedGenre) return [];

    return games.filter((game) => {
      const genreMatch =
        game.genre.toLowerCase() === selectedGenre.toLowerCase();
      if (!genreMatch) return false;

      const reqRAM = parseRAMString(game.minimum_system_requirements?.memory);

      return ramInput >= 16 ? true : reqRAM <= ramInput;
    });
  },
};

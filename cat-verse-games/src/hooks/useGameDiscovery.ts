import type { Game } from "@strategies/types/selectorGameTypes";
import { useCallback, useState } from "react";

export const useGameDiscovery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGameDetails = async (id: number): Promise<Game | null> => {
    try {
      const response = await fetch(`/api/game?id=${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

  const fetchGames = useCallback(
    async (genres: string[], platform: string): Promise<Game[]> => {
      setLoading(true);
      setError(null);

      let url = "";
      const params = new URLSearchParams();

      if (platform && platform !== "all") {
        params.append("platform", platform);
      }

      if (genres.length > 1) {
        params.append("tag", genres.join("."));
        url = `/api/filter?${params.toString()}`;
      } else if (genres.length === 1) {
        params.append("category", genres[0]);
        url = `/api/games?${params.toString()}`;
      } else {
        url = `/api/games?${params.toString()}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) return [];

        const basicGames: Game[] = await response.json();

        const gamesToEnrich = basicGames.slice(0, 20);
        const enrichedGames: Game[] = [];

        for (let i = 0; i < gamesToEnrich.length; i += 10) {
          const batch = gamesToEnrich.slice(i, i + 10);
          const details = await Promise.all(
            batch.map((g) => fetchGameDetails(g.id)),
          );

          enrichedGames.push(...(details.filter((d) => d !== null) as Game[]));

          if (i + 10 < gamesToEnrich.length) {
            await new Promise((resolve) => setTimeout(resolve, 1050));
          }
        }

        return enrichedGames;
      } catch (err: any) {
        setError("Erro ao conectar com a API.");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { fetchGames, loading, error };
};

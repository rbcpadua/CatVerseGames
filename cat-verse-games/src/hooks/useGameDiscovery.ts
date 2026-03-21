import type { Game } from "@strategies/types/selectorGameTypes";
import { useCallback, useState } from "react";

export const useGameDiscovery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(
    async (genre?: string, platform?: string): Promise<Game[]> => {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (platform) params.append("platform", platform);
      if (genre) params.append("category", genre.toLowerCase());

      const url = `/api/games${params.toString() ? `?${params.toString()}` : ""}`;

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          if (response.status === 404) return [];
          throw new Error(`Erro: ${response.status}`);
        }

        return await response.json();
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Requisição cancelada pelo usuário");
          return [];
        }
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

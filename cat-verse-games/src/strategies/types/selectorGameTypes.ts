export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  minimum_system_requirements?: {
    os?: string;
    processor?: string;
    memory?: string;
    graphics?: string;
    storage?: string;
  };
}
export interface GameSelectionStrategy {
  name: string;
  filter(games: Game[], ramInput: number, selectedGenre: string): Game[];
}

/**
 * Interface genérica para dados exibidos no Card
 * Qualquer tipo que tenha essas propriedades pode ser usado no Card
 */
export interface CardDisplayItem {
  thumbnail: string;
  title: string;
  short_description: string;
}

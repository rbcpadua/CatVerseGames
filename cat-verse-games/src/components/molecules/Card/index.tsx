import type { CardDisplayItem } from "./types";

type CardProps<T extends CardDisplayItem> = {
  item: T;
};
export const Card = <T extends CardDisplayItem>({ item }: CardProps<T>) => (
  <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-4 bg-base-100 dark:bg-base-200 p-3 rounded-xl border border-base-300 shadow-sm items-center w-full transition-colors duration-300">
    <div className="flex-shrink-0">
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="w-full h-16 sm:h-20 rounded-lg object-cover shadow-md"
      />
    </div>

    <div className="flex flex-col min-w-0 text-left">
      <h4 className="font-bold text-sm sm:text-base text-base-content leading-tight truncate">
        {item.title}
      </h4>
      <p className="text-xs text-base-content/70 line-clamp-2 mt-1">
        {item.short_description}
      </p>
    </div>
  </div>
);

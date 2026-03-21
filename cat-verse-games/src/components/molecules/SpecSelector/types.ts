import type { MouseEventHandler } from "react";

export interface SpecSelectorProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  onClick: MouseEventHandler<HTMLInputElement>;
  labels: string[];
}

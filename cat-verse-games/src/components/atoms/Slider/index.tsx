import type { MouseEventHandler } from "react";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  onClick: MouseEventHandler<HTMLInputElement>;
};

export const Slider = ({ value, onChange, onClick }: SliderProps) => (
  <div className="w-full flex flex-col gap-1">
    <input
      type="range"
      min="2"
      max="32"
      value={value}
      onClick={onClick}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full range range-primary range-sm"
      step="2"
    />
  </div>
);

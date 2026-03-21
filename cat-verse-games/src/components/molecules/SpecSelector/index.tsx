import { Slider } from "@components/atoms";
import type { SpecSelectorProps } from "./types";

const SpecSelector = ({
  title,
  value,
  onChange,
  onClick,
  labels,
}: SpecSelectorProps) => {
  const calculatePosition = (label: string) => {
    const val = parseInt(label);
    const min = 2;
    const max = 32;
    return ((val - min) / (max - min)) * 100;
  };

  return (
    <section className="sm:w-full w-[330px] space-y-6">
      <h3 className="text-lg font-bold text-primary/80">{title}</h3>
      <div className="relative w-full px-2">
        <Slider value={value} onChange={onChange} onClick={onClick} />
        <div className="relative w-full h-6 mt-2">
          {labels.map((label) => (
            <span
              key={label}
              className="absolute -translate-x-1/2 text-[10px] font-bold opacity-50 uppercase tracking-tighter whitespace-nowrap"
              style={{ left: `${calculatePosition(label)}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecSelector;

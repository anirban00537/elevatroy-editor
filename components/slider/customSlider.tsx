import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const CustomSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: CustomSliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-zinc-400">{label}</label>
        <span className="text-xs text-zinc-500">{value}</span>
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        max={max}
        min={min}
        step={step}
      >
        <SliderPrimitive.Track
          className="relative h-2 w-full grow overflow-hidden rounded-full 
            bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-600
            shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] 
            border border-zinc-700/50 backdrop-blur-sm"
        >
          <SliderPrimitive.Range
            className="absolute h-full 
              bg-gradient-to-r from-accent/90 via-accent to-accent/90
              shadow-[0_0_8px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]"
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full 
            border border-zinc-500/50
            bg-gradient-to-b from-white via-zinc-200 to-zinc-300
            shadow-[0_2px_5px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8)] 
            transition-all duration-100
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:ring-offset-2
            hover:from-white hover:via-zinc-100 hover:to-zinc-200
            hover:scale-105 active:scale-95"
        />
      </SliderPrimitive.Root>
    </div>
  );
};

export default CustomSlider;

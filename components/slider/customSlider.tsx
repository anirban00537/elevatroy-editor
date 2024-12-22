import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

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
    <span dir="ltr" data-orientation="horizontal" className="slider-component">
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        max={max}
        min={min}
        step={step}
      >
        <SliderPrimitive.Track className="track">
          <SliderPrimitive.Range className="rail" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="thumb" />
        <div className="labels">
          <span>{label}</span>
          <span>{value}</span>
        </div>
      </SliderPrimitive.Root>
    </span>
  );
};

export default CustomSlider;

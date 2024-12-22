import React from "react";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onChange,
  min = 0.5,
  max = 2,
  step = 0.1,
  className = "",
}) => {
  return (
    <div className="flex  w-full py-2  items-start justify-start ">
      <h1 className="text-xs flex items-center  font-medium  text-gray-300 w-full">
        {/* <Shrink size={12} className="mr-2" /> */}
        {label}
      </h1>
      <Slider
        value={[value]}
        max={max}
        min={min}
        onValueChange={(newValue) => onChange(newValue[0])}
        step={step}
        className={cn("w-[100%]", className)}
      />
    </div>
  );
};

export default CustomSlider;

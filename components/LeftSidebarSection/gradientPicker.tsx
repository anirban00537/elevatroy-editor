import { ColorPalettes } from "@/helpers/core-constants";
import { useColors } from "@/hooks/useScreenshotEditor";
import { HexColorPicker } from "react-colorful";

import React from "react";
import {
  Plus,
  X,
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, Transition } from "@headlessui/react";

interface ColorPalette {
  id: number;
  color: string;
}

interface GradientPickerProps {
  gradientColors: ColorPalette[];
  handleRemoveColor: (id: number) => void;
  handleAddColor: () => void;
  handleColorPickerChange: (color: string, id: number) => void;
  addGradientToColorPallet: (colorArray: ColorPalette[]) => void;
  handleGradientDirectionChange: (direction: string) => void;
}

const GradientPicker = ({
  gradientColors,
  handleRemoveColor,
  handleAddColor,
  handleColorPickerChange,
  addGradientToColorPallet,
  handleGradientDirectionChange,
}: GradientPickerProps) => {
  const gradientDirections = [
    { name: "to top", icon: <ArrowUp size={18} color="white" /> },
    { name: "to top right", icon: <ArrowUpRight size={18} color="white" /> },
    { name: "to right", icon: <ArrowRight size={18} color="white" /> },
    {
      name: "to bottom right",
      icon: <ArrowDownRight size={18} color="white" />,
    },
    { name: "to bottom", icon: <ArrowDown size={18} color="white" /> },
    {
      name: "to bottom left",
      icon: <ArrowDownLeft size={18} color="white" />,
    },
    { name: "to left", icon: <ArrowLeft size={18} color="white" /> },
    { name: "to top left", icon: <ArrowUpLeft size={18} color="white" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Gradient Colors */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Gradient Colors</h4>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddColor}
            className="w-8 h-8 rounded-full bg-dark-300 hover:bg-dark-400 
              flex items-center justify-center text-zinc-400"
          >
            <Plus size={16} />
          </button>
          {gradientColors.map((color, index) => (
            <Popover key={color.id}>
              <Popover.Button
                className="relative w-8 h-8 rounded-full border border-white/10"
                style={{ backgroundColor: color.color }}
              >
                {index > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveColor(color.id);
                    }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full 
                      bg-dark-200 text-zinc-400 text-xs flex items-center 
                      justify-center hover:bg-dark-300"
                  >
                    ×
                  </button>
                )}
              </Popover.Button>
              <Popover.Panel className="absolute z-10">
                <HexColorPicker
                  color={color.color}
                  onChange={(newColor) => handleColorPickerChange(newColor, color.id)}
                />
              </Popover.Panel>
            </Popover>
          ))}
        </div>
      </div>

      {/* Gradient Direction */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Gradient Direction</h4>
        <div className="grid grid-cols-8 gap-1">
          {gradientDirections.map((direction, index) => (
            <button
              key={index}
              onClick={() => handleGradientDirectionChange(direction.name)}
              className="aspect-square rounded bg-dark-300 hover:bg-dark-400 
                flex items-center justify-center text-zinc-400 transition-colors"
            >
              {direction.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palettes */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Color Palettes</h4>
        <div className="grid grid-cols-4 gap-2">
          {ColorPalettes.map((palette, index) => (
            <button
              key={index}
              onClick={() => addGradientToColorPallet(palette)}
              className="aspect-video rounded-lg overflow-hidden cursor-pointer 
                hover:ring-2 hover:ring-white/20 transition-all"
              style={{
                background: `linear-gradient(to right, ${palette
                  .map((color) => color.color)
                  .join(", ")})`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientPicker;

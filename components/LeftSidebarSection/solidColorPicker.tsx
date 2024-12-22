import { FlatColors } from "@/helpers/core-constants";
import React from "react";
import { Popover } from "@headlessui/react";
import { HexColorPicker } from "react-colorful";
import { Palette } from "lucide-react";

interface SolidColorPickerProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const SolidColorPicker = ({
  backgroundColor,
  setBackgroundColor,
}: SolidColorPickerProps) => {
  return (
    <div className="space-y-6">
      {/* Current Color Picker */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Current Color</h4>
        <div className="flex items-center gap-3">
          <Popover className="relative">
            <Popover.Button
              className="w-10 h-10 rounded-lg border border-white/10 
                transition-transform hover:scale-105"
              style={{ backgroundColor }}
            />
            <Popover.Panel className="absolute z-10 top-full mt-2">
              <HexColorPicker
                color={backgroundColor}
                onChange={setBackgroundColor}
              />
            </Popover.Panel>
          </Popover>
          <div className="flex-1">
            <input
              type="text"
              value={backgroundColor.toUpperCase()}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full px-3 py-2 bg-dark-300 rounded-md text-sm 
                text-zinc-200 border border-white/10 focus:outline-none 
                focus:ring-1 focus:ring-white/20"
            />
          </div>
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Color Presets</h4>
        <div className="grid grid-cols-6 gap-2">
          {FlatColors.map((color, index) => (
            <button
              key={index}
              onClick={() => setBackgroundColor(color)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer 
                hover:ring-2 hover:ring-white/20 transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Recently Used */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Recently Used</h4>
        <div className="grid grid-cols-8 gap-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg bg-dark-300 border 
                border-white/5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolidColorPicker;

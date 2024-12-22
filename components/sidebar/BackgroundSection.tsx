import React, { useState } from "react";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { Popover, Transition } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { ColorPalettes, FlatColors, Images } from "@/helpers/core-constants";
import {
  ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight,
  ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft
} from "lucide-react";

interface BackgroundSectionProps {
  gradientColors: any[];
  handleRemoveColor: (id: number) => void;
  handleAddColor: () => void;
  handleColorPickerChange: (color: string, id: number) => void;
  addGradientToColorPallet: (palette: any) => void;
  handleGradientDirectionChange: (direction: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  handleBackgroundImage: (image: string) => void;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  gradientColors,
  handleRemoveColor,
  handleAddColor,
  handleColorPickerChange,
  addGradientToColorPallet,
  handleGradientDirectionChange,
  backgroundColor,
  setBackgroundColor,
  handleBackgroundImage,
}) => {
  const [activeTab, setActiveTab] = useState<'gradient' | 'solid' | 'image'>('gradient');
  
  const gradientDirections = [
    { name: "to top", icon: <ArrowUp size={18} /> },
    { name: "to top right", icon: <ArrowUpRight size={18} /> },
    { name: "to right", icon: <ArrowRight size={18} /> },
    { name: "to bottom right", icon: <ArrowDownRight size={18} /> },
    { name: "to bottom", icon: <ArrowDown size={18} /> },
    { name: "to bottom left", icon: <ArrowDownLeft size={18} /> },
    { name: "to left", icon: <ArrowLeft size={18} /> },
    { name: "to top left", icon: <ArrowUpLeft size={18} /> },
  ];

  return (
    <section className="space-y-4">
      <div className="flex space-x-2 border-b border-dark-border/20">
        {['gradient', 'solid', 'image'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-xs font-medium transition-colors
              ${activeTab === tab 
                ? 'text-zinc-200 border-b-2 border-zinc-200' 
                : 'text-zinc-400 hover:text-zinc-300'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'gradient' && (
          <div className="space-y-6">
            {/* Gradient Colors */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-400">Colors</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleAddColor}
                  className="w-8 h-8 rounded-full border border-dark-border/20 
                    bg-dark-200 hover:bg-dark-300 flex items-center justify-center"
                >
                  <Plus size={14} className="text-zinc-200" />
                </button>
                {gradientColors.map((gradient: any) => (
                  <Popover key={gradient.id} className="relative">
                    <Popover.Button
                      className="w-8 h-8 rounded-full border border-dark-border/20"
                      style={{ backgroundColor: gradient.color }}
                    >
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveColor(gradient.id);
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-dark-300 
                          rounded-full flex items-center justify-center"
                      >
                        <X size={10} className="text-zinc-200" />
                      </span>
                    </Popover.Button>
                    <Transition
                      enter="transition duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Panel className="absolute z-10 mt-2">
                        <HexColorPicker
                          color={gradient.color}
                          onChange={(color) => handleColorPickerChange(color, gradient.id)}
                        />
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                ))}
              </div>
            </div>

            {/* Gradient Direction */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-400">Direction</h3>
              <div className="grid grid-cols-4 gap-2">
                {gradientDirections.map((direction) => (
                  <button
                    key={direction.name}
                    onClick={() => handleGradientDirectionChange(direction.name)}
                    className="p-2 rounded-md bg-dark-200 hover:bg-dark-300 
                      text-zinc-200 transition-colors"
                  >
                    {direction.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient Presets */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-400">Presets</h3>
              <div className="grid grid-cols-4 gap-2">
                {ColorPalettes.map((palette, index) => (
                  <button
                    key={index}
                    onClick={() => addGradientToColorPallet(palette)}
                    className="h-16 rounded-md cursor-pointer"
                    style={{
                      background: `linear-gradient(to bottom left, ${palette
                        .map((color) => color.color)
                        .join(", ")})`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solid' && (
          <div className="space-y-6">
            {/* Color Picker */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-400">Color</h3>
              <Popover className="relative">
                <Popover.Button
                  className="w-10 h-10 rounded-full border border-dark-border/20"
                  style={{ backgroundColor }}
                />
                <Transition
                  enter="transition duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute z-10 mt-2">
                    <HexColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                    />
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>

            {/* Color Presets */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-400">Presets</h3>
              <div className="grid grid-cols-4 gap-2">
                {FlatColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setBackgroundColor(color)}
                    className="h-16 rounded-md cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-zinc-400">Background Images</h3>
            <div className="grid grid-cols-2 gap-2">
              {Images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleBackgroundImage(image)}
                  className="h-24 rounded-md bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BackgroundSection; 
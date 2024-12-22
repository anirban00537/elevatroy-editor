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
const GradientPicker = ({
  gradientColors,
  handleRemoveColor,
  handleAddColor,
  handleColorPickerChange,
  addGradientToColorPallet,
  handleGradientDirectionChange,
}: any) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative pb-[500px] overflow-y-auto inline-block no-scrollbar text-left w-full my-3"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <div className="">
        <AnimatePresence>
          <>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-xs font-medium text-white"
            >
              Gradient Colors
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-6 gap-2 mt-5 "
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-gray-800"
                onClick={handleAddColor}
              >
                <Plus
                  color="white"
                  size={18}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </motion.button>
              {gradientColors.map((gradient: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative gradient-item "
                >
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                          style={{ backgroundColor: gradient.color }}
                        >
                          <span
                            className="absolute -top-1 p-0.5 -right-1 bg-blue-500 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveColor(gradient.id);
                            }}
                          >
                            <X color="white" size={12} />
                          </span>
                        </Popover.Button>

                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel>
                            <div className="absolute top-12 left-0">
                              <HexColorPicker
                                color={gradient.color}
                                onChange={(color) => {
                                  handleColorPickerChange(color, gradient.id);
                                }}
                              />
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-xs font-medium text-white mb-2"
              >
                Gradient Direction
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex space-x-2"
              >
                {gradientDirections.map((direction, index) => (
                  <motion.button
                    key={index}
                    onClick={() =>
                      handleGradientDirectionChange(direction.name)
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-md overflow-hidden bg-gradient-to-br from-blue-500 to-blue-500 p-2 cursor-pointer flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: `linear-gradient(${
                        direction.name
                      }, ${gradientColors
                        .map((gradient: any) => gradient.color)
                        .join(", ")})`,
                    }}
                  >
                    {direction.icon}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </>
        </AnimatePresence>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-xs font-medium text-white my-4"
        >
          Color Palettes
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="grid grid-cols-3 lg:grid-cols-4 gap-1"
        >
          {ColorPalettes.map((palette, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="  "
            >
              <div
                className="w-full h-20 rounded-lg overflow-hidden  cursor-pointer "
                onClick={() => {
                  addGradientToColorPallet(palette);
                }}
                style={{
                  background: `linear-gradient(to bottom left, ${palette
                    .map((color) => color.color)
                    .join(", ")})`,
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GradientPicker;

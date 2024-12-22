import { FlatColors } from "@/helpers/core-constants";
import React from "react";
import { Popover } from "@headlessui/react";
import { HexColorPicker } from "react-colorful";
import { motion } from "framer-motion";

const SolidColorComponent = ({
  backgroundColor,
  setBackgroundColor,
}: {
  backgroundColor: string;
  setBackgroundColor: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-y-auto inline-block no-scrollbar text-left w-full my-3"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-sm font-medium text-white mt-5"
        >
          Solid Color
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-3"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="relative gradient-item"
          >
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                    style={{ backgroundColor: backgroundColor }}
                  ></Popover.Button>

                  <Popover.Panel>
                    <div className="absolute top-12 left-0">
                      <HexColorPicker
                        color={backgroundColor}
                        onChange={(color) => {
                          setBackgroundColor(color);
                        }}
                      />
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </motion.div>
        </motion.div>
      </>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className=""
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-lg font-medium text-white mb-4"
        >
          Color Palettes
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="grid grid-cols-3 lg:grid-cols-4  gap-1"
        >
          {FlatColors.map((color, index) => (
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
                  setBackgroundColor(color);
                }}
                style={{
                  background: `${color}`,
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SolidColorComponent;

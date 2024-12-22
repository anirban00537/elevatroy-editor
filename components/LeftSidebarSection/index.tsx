import React, { useState } from "react";
import { motion } from "framer-motion";
import { useColors } from "@/hooks/useScreenshotEditor";
import GradientPicker from "@/components/LeftSidebarSection/gradientPicker";
import { setGradientDirection } from "@/store/slice/editor.slice";
import { useDispatch } from "react-redux";
import SolidColorComponent from "./solidColorPicker";
import ImageComponent from "./imagePicker";
import FramePicker from "./framePicker";

const BackgroundSection: React.FC = () => {
  const {
    backgroundType,
    gradientColors,
    handleRemoveColor,
    handleAddColor,
    handleColorPickerChange,
    addGradientToColorPallet,
    setBackgroundColor,
    backgroundColor,
    handleBackgroundImage,
  } = useColors();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("gradient");

  const handleTabChange = (type: string) => {
    setActiveTab(type);
  };

  const handleGradientDirectionChange = (direction: string) => {
    dispatch(setGradientDirection(direction));
  };

  const slideUpAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="px-5 md:w-[380px] h-full border-r border-dark-border/20 bg-dark">
      <div className="">
        <motion.div
          variants={slideUpAnimation}
          className="grid grid-cols-4 border rounded-lg border-dark-border/20 gap-2 mt-5 text-zinc-200"
        >
          {["gradient", "solid", "image", "frame"].map((type) => (
            <motion.div
              key={type}
              className={`p-2 m-1 rounded-md text-xs flex items-center justify-center cursor-pointer 
                ${activeTab === type 
                  ? "bg-dark-300 text-zinc-200" 
                  : "hover:bg-dark-200"}`}
              onClick={() => {
                handleTabChange(type);
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.div>
          ))}
        </motion.div>
        {activeTab === "gradient" ? (
          <GradientPicker
            gradientColors={gradientColors}
            handleRemoveColor={handleRemoveColor}
            handleAddColor={handleAddColor}
            handleColorPickerChange={handleColorPickerChange}
            addGradientToColorPallet={addGradientToColorPallet}
            handleGradientDirectionChange={handleGradientDirectionChange}
          />
        ) : activeTab === "solid" ? (
          <SolidColorComponent
            setBackgroundColor={setBackgroundColor}
            backgroundColor={backgroundColor}
          />
        ) : activeTab === "image" ? (
          <ImageComponent handleBackgroundImage={handleBackgroundImage} />
        ) : activeTab === "frame" ? (
          <FramePicker />
        ) : null}
      </div>
    </div>
  );
};

export default BackgroundSection;

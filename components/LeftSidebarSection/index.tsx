import React, { useState } from "react";
import { motion } from "framer-motion";
import { useColors } from "@/hooks/useScreenshotEditor";
import GradientPicker from "./gradientPicker";
import { setGradientDirection } from "@/store/slice/editor.slice";
import { useDispatch } from "react-redux";
import SolidColorComponent from "./solidColorPicker";
import ImageComponent from "./imagePicker";
import FramePicker from "./framePicker";
import { CustomTabs } from "@/components/ui/custom-tabs";
interface ColorPalette {
  id: number;
  color: string;
}

interface BackgroundSectionProps {
  gradientColors?: ColorPalette[];
  handleRemoveColor?: (id: number) => void;
  handleAddColor?: () => void;
  handleColorPickerChange?: (newColor: string, id: number) => void;
  addGradientToColorPallet?: (colorArray: ColorPalette[]) => void;
  handleGradientDirectionChange?: (direction: string) => void;
  backgroundColor?: string;
  setBackgroundColor?: (color: string) => void;
  handleBackgroundImage?: (image: string) => void;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = (props) => {
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

  const handleGradientDirectionChange = (direction: string) => {
    dispatch(setGradientDirection(direction));
  };

  const tabs = [
    { id: "gradient", label: "Gradient" },
    { id: "solid", label: "Solid" },
    { id: "image", label: "Image" },
    { id: "frame", label: "Frame" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "gradient":
        return (
          <GradientPicker
            gradientColors={gradientColors as ColorPalette[]}
            handleRemoveColor={handleRemoveColor}
            handleAddColor={handleAddColor}
            handleColorPickerChange={handleColorPickerChange}
            addGradientToColorPallet={addGradientToColorPallet}
            handleGradientDirectionChange={handleGradientDirectionChange}
          />
        );
      case "solid":
        return (
          <SolidColorComponent
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
          />
        );
      case "image":
        return <ImageComponent handleBackgroundImage={handleBackgroundImage} />;
      case "frame":
        return <FramePicker />;
      default:
        return null;
    }
  };

  return (
    <div className=" h-full border-b border-dark-border/20">
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div className="mt-5">
        {renderContent()}
      </div>
    </div>
  );
};

export default BackgroundSection;

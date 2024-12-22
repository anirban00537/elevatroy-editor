import React from "react";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCodeCanvas, useColors } from "@/hooks/useCodeEditor";
import GradientPicker from "../LeftSidebarSection/gradientPicker";
import CustomSlider from "../slider/customSlider";
import { languages, themes } from "@/helpers/options";
import { cn } from "@/lib/utils";
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";

const FloatingContainerForCodeEditor = ({ handleExport }: any) => {
  const {
    backgroundToggleDispatch,
    background,
    darkmodeToggleDispatch,
    darkMode,
    padding,
    setPaddingDispatch,
    theme,
    language,
    setLanguageDispatch,
    fontSize,
    setFontSizeDispatch,
    watermark,
    setWatermarkDispatch,
    gradientDirection,
    handleGradientDirectionChange,
    handleRotateX,
    handleRotateY,
    threeD,
  } = useCodeCanvas();
  const {
    addGradientToColorPallet,
    gradientColors,
    handleAddColor,
    handleColorPickerChange,
    handleRemoveColor,
    setGradientColors,
  } = useColors();
  const handleRotateLeft = () => {
    handleRotateY(threeD.rotateY - 10);
  };

  const handleRotateRight = () => {
    handleRotateY(threeD.rotateY + 10);
  };

  const handleRotateUp = () => {
    handleRotateX(threeD.rotateX + 10);
  };

  const handleRotateDown = () => {
    handleRotateX(threeD.rotateX - 10);
  };
  return (
    <div className="flex flex-col px-10 md:px-4 border border-t-0 border-b-0 border-slate-800 h-screen w-full md:w-[400px] bg-[#191922] no-scrollbar">
      <label
        className="text-[15px] font-semibold text-white mr-2 mt-4 md:mt-[60px]"
        htmlFor="airplane-mode"
      >
        Control Panel
      </label>
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-4 mt-4 md:gap-0 md:mt-0">
          <div className="flex flex-col items-start justify-start">
            <label
              className="text-[12px] font-medium text-white mr-2"
              htmlFor="airplane-mode"
            >
              Background
            </label>
            <div className="mt-2">
              <Switch
                checked={background}
                onCheckedChange={() => {
                  backgroundToggleDispatch();
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <label
              className="text-[12px] font-medium text-white mr-2"
              htmlFor="airplane-mode"
            >
              Dark mode
            </label>
            <div className="mt-2">
              <Switch
                checked={darkMode}
                onCheckedChange={() => {
                  darkmodeToggleDispatch();
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <label
              className="text-[12px] font-medium text-white mr-2"
              htmlFor="airplane-mode"
            >
              Watermark
            </label>
            <div className="mt-2">
              <Switch
                checked={watermark}
                onCheckedChange={() => {
                  setWatermarkDispatch(!watermark);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <CustomSlider
            label="Padding"
            value={padding}
            onChange={setPaddingDispatch}
            min={20}
            max={200}
            step={1}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Font Size"
            value={fontSize}
            onChange={setFontSizeDispatch}
            min={10}
            max={28}
            step={1}
          />
        </div>
        <div className="flex">
          <label className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-2">
            Language
          </label>
          <Select
            value={language}
            onValueChange={(languageValue) =>
              setLanguageDispatch(languageValue)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent className="dark">
              {Object.entries(languages).map(([name, theme]) => (
                <SelectItem key={name} value={name}>
                  <div className="flex gap-2 items-center">
                    <span className="capitalize">{name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between w-full mt-3">
            <h1 className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-2">
              3D Rotation
            </h1>
          </div>
          <div className=" mt-4 flex flex-row justify-center items-center  rounded-2xl border-1 border-slate-800">
            <button
              className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
              onClick={handleRotateLeft}
            >
              <MoveLeft size={8} />
            </button>

            <div className="flex flex-col justify-center items-center">
              <button
                className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
                onClick={handleRotateUp}
              >
                <MoveUp size={8} />
              </button>

              <button
                className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
                onClick={handleRotateDown}
              >
                <MoveDown size={8} />
              </button>
            </div>

            <button
              className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
              onClick={handleRotateRight}
            >
              <MoveRight size={8} />
            </button>
          </div>
        </div>
        <div className="">
          <GradientPicker
            gradientColors={gradientColors}
            handleRemoveColor={handleRemoveColor}
            handleAddColor={handleAddColor}
            handleColorPickerChange={handleColorPickerChange}
            addGradientToColorPallet={addGradientToColorPallet}
            handleGradientDirectionChange={handleGradientDirectionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingContainerForCodeEditor;

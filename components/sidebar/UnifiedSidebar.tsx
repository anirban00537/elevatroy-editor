import React from "react";
import { motion } from "framer-motion";
import { useColors } from "@/hooks/useScreenshotEditor";
import { useImageSection } from "@/hooks/useScreenshotEditor";
import { Folder, Plus, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CustomSlider from "@/components/slider/customSlider";
import ElementsSection from "./elementsSection";
import BackgroundSection from "./BackgroundSection";
import FramePicker from "@/components/LeftSidebarSection/framePicker";
import { useDispatch } from "react-redux";
import { setGradientDirection } from "@/store/slice/editor.slice";

interface UnifiedSidebarProps {
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: (width: number, height: number) => void;
  image: any;
}

const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  handleFileInputChange,
  handleExport,
  image,
}) => {
  const {
    imageRadius,
    canvasRadius,
    handleImageRadiusChange,
    handleCanvasRadiusChange,
    setGridOverlayState,
    gridOverlay,
    setWaterMarkState,
    waterMark,
    handleShadowChange,
    imageShadow,
    imageScale,
    handleImageScale,
    handleContentScale,
    contentScale,
  } = useImageSection();

  const {
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

  const handleGradientDirectionChange = (direction: string) => {
    dispatch(setGradientDirection(direction));
  };

  return (
    <aside className="fixed left-0 top-[65px] bottom-0 w-[320px] bg-[#0D0D12] overflow-y-auto">
      <div className="p-5 space-y-6">
        {/* Adjustments Section */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Adjustments</h3>
          <div className="space-y-5">
            <CustomSlider
              label="Image Radius"
              value={imageRadius}
              onChange={handleImageRadiusChange}
              min={0}
              max={100}
              step={1}
            />
            <CustomSlider
              label="Canvas Radius"
              value={canvasRadius}
              min={0}
              max={100}
              step={1}
              onChange={handleCanvasRadiusChange}
            />
            <CustomSlider
              label="Shadow"
              value={imageShadow}
              min={0}
              max={12}
              step={1}
              onChange={handleShadowChange}
            />
            <CustomSlider
              label="Image Size"
              value={imageScale}
              min={0.1}
              max={2}
              step={0.1}
              onChange={handleImageScale}
            />
            <CustomSlider
              label="Content Size"
              value={contentScale}
              min={0.1}
              max={2}
              step={0.1}
              onChange={handleContentScale}
            />
          </div>
        </section>

        {/* Settings Section */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Settings</h3>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center justify-between flex-1">
              <span className="text-xs text-zinc-400">Watermark</span>
              <Switch
                checked={waterMark}
                onCheckedChange={() => setWaterMarkState(!waterMark)}
                className="data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-700"
              />
            </div>
            <div className="flex items-center justify-between flex-1">
              <span className="text-xs text-zinc-400">Grid Overlay</span>
              <Switch
                checked={gridOverlay}
                onCheckedChange={() => setGridOverlayState(!gridOverlay)}
                className="data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-700"
              />
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Image</h3>
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-full py-2.5 px-4 
              bg-dark-200 hover:bg-dark-300 rounded-md cursor-pointer 
              text-xs text-zinc-400 transition-colors"
          >
            Upload Image
          </label>
          <div className="grid grid-cols-5 gap-2 mt-4">
            <button className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400">
              T
            </button>
            <button className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400">
              ↗
            </button>
            <button className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400">
              ○
            </button>
            <button className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400">
              ↱
            </button>
            <button className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400">
              □
            </button>
          </div>
        </section>

        {/* Background Section */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Background</h3>
          <BackgroundSection
            gradientColors={gradientColors}
            handleRemoveColor={handleRemoveColor}
            handleAddColor={handleAddColor}
            handleColorPickerChange={handleColorPickerChange}
            addGradientToColorPallet={addGradientToColorPallet}
            handleGradientDirectionChange={handleGradientDirectionChange}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            handleBackgroundImage={handleBackgroundImage}
          />
        </section>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </aside>
  );
};

export default UnifiedSidebar; 
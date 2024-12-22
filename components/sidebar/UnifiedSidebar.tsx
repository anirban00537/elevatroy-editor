import React from "react";
import { motion } from "framer-motion";
import { useColors, useImageSection } from "@/hooks/useScreenshotEditor";
import {
  Folder,
  Plus,
  ChevronRight,
  Download,
  Copy,
  ArrowRight,
  Settings,
  Image,
  Sliders,
  Layout,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CustomSlider from "@/components/slider/customSlider";
import BackgroundSection from "./BackgroundSection";
import { useDispatch, useSelector } from "react-redux";
import { setGradientDirection } from "@/store/slice/editor.slice";
import CanvasInputSize from "../canvasSize/canvasInputSize";
import CanvasSize from "../canvasSize";
import Link from "next/link";
import type { RootState } from "@/store";

interface UnifiedSidebarProps {
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: (width: number, height: number) => void;
  handleCopyImageToClipboard: () => void;
  image: any;
}

const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  handleFileInputChange,
  handleExport,
  handleCopyImageToClipboard,
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

  const { width, height } = useSelector((state: RootState) => state.editor);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[320px] bg-[#0D0D12] overflow-y-auto">
      <div className="p-5 space-y-6 pb-32">
        {/* Image Section - First */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Image size={16} />
            Image
          </h3>
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-full py-2.5 px-4 
              bg-dark-200 hover:bg-dark-300 rounded-md cursor-pointer 
              text-xs text-zinc-400 transition-colors"
          >
            Upload Image
          </label>
          <div className="grid grid-cols-5 gap-2 mt-4">
            <button
              className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400"
            >
              T
            </button>
            <button
              className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400"
            >
              ↗
            </button>
            <button
              className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400"
            >
              ○
            </button>
            <button
              className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400"
            >
              ↱
            </button>
            <button
              className="aspect-square rounded bg-dark-200 hover:bg-dark-300 
              flex items-center justify-center text-zinc-400"
            >
              □
            </button>
          </div>
        </section>

        {/* Adjustments Section - Second */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Sliders size={16} />
            Adjustments
          </h3>
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

        {/* Settings Section - Third */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Settings size={16} />
            Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark-200 rounded-md">
              <span className="text-sm text-zinc-400">Watermark</span>
              <Switch
                checked={waterMark}
                onCheckedChange={() => setWaterMarkState(!waterMark)}
                className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-dark-400"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-200 rounded-md">
              <span className="text-sm text-zinc-400">Grid Overlay</span>
              <Switch
                checked={gridOverlay}
                onCheckedChange={() => setGridOverlayState(!gridOverlay)}
                className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-dark-400"
              />
            </div>
          </div>
        </section>

        {/* Canvas Size Section - Fourth */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Layout size={16} />
            Canvas Size
          </h3>
          <div className="space-y-3">
            <CanvasInputSize />
            <CanvasSize />
          </div>
        </section>

        {/* Background Section - Last */}
        <section>
          <h3 className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
            <Layout size={16} />
            Background
          </h3>
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

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 w-[320px] p-4 bg-[#0D0D12] border-t border-dark-border">
        <div className="flex gap-2">
          <button
            onClick={() => handleExport(width, height)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 
              bg-accent hover:bg-accent-hover rounded-md cursor-pointer 
              text-sm text-white transition-colors"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={handleCopyImageToClipboard}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 
              bg-dark-200 hover:bg-dark-300 rounded-md cursor-pointer 
              text-sm text-zinc-400 transition-colors border border-dark-border"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UnifiedSidebar;

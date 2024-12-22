import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColors, useImageSection } from "@/hooks/useScreenshotEditor";
import {
  Download,
  Copy,
  Settings,
  Image,
  Sliders,
  Layout,
  Palette, // for background
  Move,
  Github,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Switch } from "@/components/ui/switch";
import CanvasSize from "../canvasSize";
import CanvasInputSize from "../canvasSize/canvasInputSize";
import CustomSlider from "../slider/customSlider";
import { setGradientDirection } from "@/store/slice/editor.slice";
import BackgroundSection from "../LeftSidebarSection";
import { CustomTabs } from "@/components/ui/custom-tabs";
import { cn } from "@/lib/utils";
import type { ColorPalette } from "@/types";
import ControlSection from "../sidebar/controlSection";

interface UnifiedSidebarProps {
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: (width: number, height: number) => void;
  handleCopyImageToClipboard: () => void;
  image: any;
}
interface SectionProps {
  handleFileInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sliders?: React.ReactNode;
  switches?: React.ReactNode;
  canvasInputs?: React.ReactNode;
  gradientColors?: ColorPalette[];
  handleRemoveColor?: (id: number) => void;
  handleAddColor?: () => void;
  handleColorPickerChange?: (newColor: string, id: number) => void;
  addGradientToColorPallet?: (colorArray: ColorPalette[]) => void;
  handleGradientDirectionChange?: (direction: string) => void;
  backgroundColor?: string;
  setBackgroundColor?: (color: string) => void;
  handleBackgroundImage?: (image: string) => void;
  threeD?: any;
  handleRotateX?: (value: number) => void;
  handleRotateY?: (value: number) => void;
  translateX?: number;
  translateY?: number;
  handleTranslateX?: (value: number) => void;
  handleTranslateY?: (value: number) => void;
  image?: any;
}

const sections = [
  {
    id: "image",
    title: "Image",
    icon: Image,
    Component: ({ handleFileInputChange, image }: SectionProps) => (
      <div className="space-y-4">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-full py-2.5 px-4 
            bg-dark-200 hover:bg-dark-300 rounded-md cursor-pointer 
            text-xs text-zinc-400 transition-colors group"
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Image
            size={16}
            className="mr-2 text-zinc-400 group-hover:text-zinc-300"
          />
          Upload Image
        </label>

        {/* Show image preview if exists */}
        {image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark-300">
            <img
              src={image.src || image}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    ),
  },
  {
    id: "controls",
    title: "Controls",
    icon: Move,
    Component: ({ ...props }: SectionProps) => (
      <ControlSection
        threeD={props.threeD}
        handleRotateX={props.handleRotateX || (() => {})}
        handleRotateY={props.handleRotateY || (() => {})}
        translateX={props.translateX || 0}
        translateY={props.translateY || 0}
        handleTranslateX={props.handleTranslateX || (() => {})}
        handleTranslateY={props.handleTranslateY || (() => {})}
      />
    ),
  },
  {
    id: "adjustments",
    title: "Adjustments",
    icon: Sliders,
    Component: ({ sliders }: any) => <div className="space-y-5">{sliders}</div>,
  },
  {
    id: "background",
    title: "Background",
    icon: Palette,
    Component: ({ ...props }: SectionProps) => <BackgroundSection {...props} />,
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    Component: ({ switches }: any) => (
      <div className="space-y-3">{switches}</div>
    ),
  },
  {
    id: "canvas",
    title: "Canvas Size",
    icon: Layout,
    Component: ({ canvasInputs }: any) => (
      <div className="space-y-3">{canvasInputs}</div>
    ),
  },
];

const UnifiedSidebar = ({
  handleFileInputChange,
  handleExport,
  handleCopyImageToClipboard,
  image,
}: UnifiedSidebarProps) => {
  const {
    imageRadius,
    canvasRadius,
    handleImageRadiusChange,
    handleCanvasRadiusChange,
    setGridOverlayState,
    gridOverlay,
    handleShadowChange,
    imageShadow,
    imageScale,
    handleImageScale,
    handleContentScale,
    contentScale,
    threeD,
    handleRotateX,
    handleRotateY,
    translateX,
    translateY,
    handleTranslateX,
    handleTranslateY,
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
      {/* Logo Section */}
      <div className="p-5 border-b border-white/10 bg-gradient-to-b from-dark-100/50 to-transparent">
        <div className="flex flex-col">
          {/* Logo and CTA */}
          <div className="flex items-center justify-between">
            {/* Logo and Byline */}
            <div className="flex flex-col">
              <img
                src="/logo.svg"
                alt="Elevatroy"
                height={120}
                width={120}
                className="w-[120px] h-auto drop-shadow-lg"
              />
              <a
                href="https://elevatroy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 ml-3 hover:text-zinc-400 
                  transition-colors mt-1 tracking-wide"
              >
                by elevatroy.com
              </a>
            </div>

            {/* Contact Button */}
            <div className="relative group">
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 
                to-accent/0 rounded-lg blur opacity-0 group-hover:opacity-100 
                transition duration-500"
              />
              <a
                href="https://elevatroy.com"
                className="relative flex items-center gap-1.5 text-[10px] font-medium 
                  text-zinc-400 hover:text-zinc-300 bg-dark-300/80 px-3 py-2 
                  rounded-lg border border-dark-border/10 hover:bg-dark-400/80 
                  transition-all duration-300"
              >
                <span>Contact for</span>
                <span className="text-accent">Development</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-6 pb-32">
        <AnimatePresence>
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Section header with gradient text */}
              <h3 className="text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
                <section.icon size={16} className="text-zinc-400" />
                <span className="bg-gradient-to-b from-white/90 to-white/60 bg-clip-text text-transparent">
                  {section.title}
                </span>
              </h3>

              {/* Section content with glow effect */}
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-md"></div>
                <div className="absolute -inset-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent rounded-md"></div>
                <div className="relative bg-dark-200 rounded-md p-4">
                  <section.Component
                    {...{
                      handleFileInputChange,
                      image,
                      sliders: (
                        <>
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
                            onChange={handleCanvasRadiusChange}
                            min={0}
                            max={100}
                            step={1}
                          />
                          <CustomSlider
                            label="Shadow"
                            value={imageShadow}
                            onChange={handleShadowChange}
                            min={0}
                            max={12}
                            step={1}
                          />
                          <CustomSlider
                            label="Image Size"
                            value={imageScale}
                            onChange={handleImageScale}
                            min={0.1}
                            max={2}
                            step={0.1}
                          />
                          <CustomSlider
                            label="Content Size"
                            value={contentScale}
                            onChange={handleContentScale}
                            min={0.1}
                            max={2}
                            step={0.1}
                          />
                        </>
                      ),
                      switches: (
                        <div className="space-y-2">
                          <div
                            className="flex items-center justify-between p-2.5 bg-dark-300 
                            rounded-lg border border-dark-border/10 hover:bg-dark-400 transition-colors"
                          >
                            <span className="text-xs font-medium text-zinc-400">
                              Grid Overlay
                            </span>
                            <Switch
                              checked={gridOverlay}
                              onChange={() => setGridOverlayState(!gridOverlay)}
                            />
                          </div>
                        </div>
                      ),
                      canvasInputs: (
                        <>
                          <CanvasInputSize />
                          <CanvasSize />
                        </>
                      ),
                      ...(section.id === "background" && {
                        gradientColors: gradientColors as ColorPalette[],
                        handleRemoveColor,
                        handleAddColor,
                        handleColorPickerChange,
                        addGradientToColorPallet,
                        handleGradientDirectionChange,
                        backgroundColor,
                        setBackgroundColor,
                        handleBackgroundImage,
                      }),
                      ...(section.id === "controls" && {
                        threeD,
                        handleRotateX,
                        handleRotateY,
                        translateX,
                        translateY,
                        handleTranslateX,
                        handleTranslateY,
                      }),
                    }}
                  />
                </div>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      {/* Fixed bottom buttons with gradient borders */}
      <div className="fixed bottom-0 left-0 w-[320px] p-4 bg-[#0D0D12] border-t border-white/10">
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

import React from "react";
import {
  ChevronRight,
  Folder,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import CustomSlider from "@/components/slider/customSlider";
import { useImageSection } from "@/hooks/useScreenshotEditor";
import CanvasSize from "@/components/canvasSize";
import { removeImage } from "@/store/slice/editor.slice";
import { Switch } from "@/components/ui/switch";
import { RootState } from "@/store";
import { alignImages } from "@/helpers/core-constants";
import ElementsSection from "../elementsSection";

interface ControlSectionProps {
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image: any;
  handleExport: (width: number, height: number) => void;
}

const ControlSection: React.FC<ControlSectionProps> = ({
  handleFileInputChange,
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
    threeD,
    handleRotateX,
    handleRotateY,
    translateX,
    translateY,
    handleTranslateX,
    handleTranslateY,
    imageScale,
    handleImageScale,
    handleContentScale,
    contentScale,
    handleActiveTab,
  } = useImageSection();
  const dispatch = useDispatch();
  const { height, width } = useSelector((state: RootState) => state.editor);
  const handleRemoveImage = () => {
    dispatch(removeImage());
  };

  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideUpAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const slideInLeftAnimation = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
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
    <motion.div
      variants={slideUpAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="overflow-y-auto "
    >
      <div className="pb-24">
        <div className=" flex gap-4 mt-2">
          <label
            htmlFor="fileInput"
            className="cursor-pointer  p-2 border border-slate-800 shadow-xl text-[12px] px-14 rounded-md flex items-center justify-center text-white "
          >
            <Folder size={14} className="mr-2" />
            Upload Image
          </label>
          <div className="flex items-center justify-center">
            {image ? (
              <div className="flex items-center">
                <img
                  className="inline-block h-9 w-9 ml-2  rounded-sm ring-2 ring-white"
                  src={image.src}
                  alt=""
                />
                <span className=" p-0.5 text-white -ml-2 -mt-9 cursor-pointer   bg-blue-500 rounded-sm">
                  <X size={12} className="" onClick={handleRemoveImage} />
                </span>
              </div>
            ) : (
              <label
                className="inline-block h-9 w-9 ml-2  rounded-sm ring ring-slate-700"
                htmlFor="fileInput"
              ></label>
            )}
          </div>
        </div>
        <ElementsSection />

        <div className="mt-4">
          <CustomSlider
            label="Image Radius"
            value={imageRadius}
            onChange={handleImageRadiusChange}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Canvas Radius"
            value={canvasRadius}
            min={0}
            max={100}
            step={1}
            onChange={handleCanvasRadiusChange}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Image Shadow"
            value={imageShadow}
            min={0}
            max={12}
            step={1}
            onChange={handleShadowChange}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Image Position X"
            value={translateX}
            min={-150}
            max={150}
            step={1}
            onChange={handleTranslateX}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Image Position Y"
            value={translateY}
            min={-150}
            max={150}
            step={1}
            onChange={handleTranslateY}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Image Size"
            value={imageScale}
            min={0.1}
            max={2}
            step={0.1}
            onChange={handleImageScale}
          />
        </div>
        <div className="">
          <CustomSlider
            label="Content Size"
            value={contentScale}
            min={0.1}
            max={2}
            step={0.1}
            onChange={handleContentScale}
          />
        </div>

        <AnimatePresence>
          <motion.div
            variants={fadeInAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col border border-slate-800  p-3  rounded-xl  mt-6 items-center justify-center mb-5"
          >
            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <div className="flex flex-row items-center justify-between w-full">
                  <h1 className="text-xs text-white text-start w-full ">
                    3D Image
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
              <div>
                <div className="flex flex-row items-center justify-between w-full">
                  <h1 className="text-xs text-white text-start w-full ">
                    Image Position
                  </h1>
                </div>
                <div className="h-[70px] w-full mt-4 grid grid-cols-3 gap-1 items-center justify-center  rounded-md">
                  {alignImages.map((item, index) => (
                    <div
                      key={index}
                      className={
                        "flex items-center justify-center h-[22px] w-9 cursor-pointer rounded-md transform-gpu transition-all duration-300 hover:scale-110 " +
                        (translateX === item.translateX &&
                        translateY === item.translateY
                          ? " bg-white rounded-md"
                          : "bg-slate-700 border border-gray-800 ")
                      }
                      style={{ alignSelf: "center", justifySelf: "center" }}
                      onClick={() => {
                        handleTranslateX(item.translateX);
                        handleTranslateY(item.translateY);
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center mt-6">
          <button
            className="w-full flex items-center  justify-between bg-transparent border border-slate-800 py-4 px-6 hover:bg-slate-900 hover:bg-opacity-20 transition-all duration-200  text-[10px] text-gray-300 font-medium text-sm "
            onClick={() => handleActiveTab("text")}
          >
            <span className="mr-2">Text Section</span>
            <ChevronRight className=" text-white mr-3" size={15} />
          </button>
        </div>

        <div className=" grid grid-cols-2 items-start justify-start mt-5">
          <div className="flex items-center justify-start">
            <label
              className="text-[12px] font-medium text-white mr-2"
              htmlFor="airplane-mode"
            >
              Watermark
            </label>

            <Switch
              checked={waterMark}
              onCheckedChange={() => {
                setWaterMarkState(!waterMark);
              }}
            />
          </div>
          <div className="flex items-center justify-start">
            <label
              className="text-[12px] font-medium text-white mr-2"
              htmlFor="airplane-mode"
            >
              Grid Overlay
            </label>

            <Switch
              checked={gridOverlay}
              onCheckedChange={() => setGridOverlayState(!gridOverlay)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlSection;

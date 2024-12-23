import React, { useState } from "react";
import DraggableText from "../draggable/draggableText";
import { useImageCanvas } from "@/hooks/useScreenshotEditor";
import Draggable from "react-draggable";
import ImageWithControls from "../elements/ImageWithControls";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeElement } from "@/store/slice/editor.slice";
import ImagePicker from "../imagePicker";
import ElementsWithControls from "../elements/elementsWithControls";
import { cn } from "@/lib/utils";

interface ImageCanvasProps {
  image: HTMLImageElement | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ image, containerRef }) => {
  const { nodeStyle, scaleStyle, imageStyle, canvasTexts, imageSrc } = useImageCanvas(image);
  const { elements } = useSelector((state: RootState) => state.editor);
  const { shadowSettings } = useSelector((state: RootState) => state.editor);

  const [isResizable, setIsResizable] = useState(false);
  const dispatch = useDispatch();
  const handleImageClick = () => {
    setIsResizable(!isResizable);
  };
  const handleRemove = (id: any) => {
    dispatch(removeElement(id));
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        className={cn(
          "transform-gpu transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.005]",
          shadowSettings.enabled ? "" : "hover:rotate-[0.5deg]"
        )}
        style={scaleStyle}
      >
        <div 
          className={cn(
            "my-node relative bg-dark-200/90 rounded-xl transition-all duration-300 backdrop-blur-xl",
            shadowSettings.enabled ? "" : "hover:translate-y-[-2px]"
          )}
          style={nodeStyle}
          ref={containerRef}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none rounded-xl" />

          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            <ImageWithControls
              src={imageSrc ?? ''}
              id={0}
              handleRemove={handleRemove}
              keepRatio={true}
              style={{
                ...imageStyle,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              imagePlaceCenter={true}
              showControl={false}
            />

            {shadowSettings.enabled && (
              <div 
                className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent 
                  pointer-events-none opacity-50 rounded-xl"
                style={{
                  transform: 'translateZ(-1px)',
                  filter: 'blur(2px)',
                }}
              />
            )}
          </div>

          {!imageSrc && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
              <ImagePicker />
            </div>
          )}

          {canvasTexts.map((property: any, index: number) => (
            <DraggableText key={index} property={property} />
          ))}
          {elements.map((item: any, index: number) => (
            <ElementsWithControls
              key={index}
              src={item.path}
              id={item.id}
              handleRemove={handleRemove}
              keepRatio={false}
              imagePlaceCenter={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;

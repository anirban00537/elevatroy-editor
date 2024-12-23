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

interface ImageCanvasProps {
  image: HTMLImageElement | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ image, containerRef }) => {
  const { nodeStyle, scaleStyle, imageStyle, canvasTexts, imageSrc } = useImageCanvas(image);
  const { elements } = useSelector((state: RootState) => state.editor);

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
        className="transform-gpu transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.005]"
        style={{
          ...scaleStyle,
          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
        }}
      >
        <div 
          className="my-node relative bg-dark-200/90 rounded-xl transition-all duration-300 backdrop-blur-xl" 
          style={{
            ...nodeStyle,
            boxShadow: `
              0 10px 30px -5px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 0 30px rgba(255, 255, 255, 0.05) inset
            `,
          }} 
          ref={containerRef}
        >
          <ImageWithControls
            src={imageSrc ?? ''}
            id={0}
            handleRemove={handleRemove}
            keepRatio={true}
            style={{
              ...imageStyle,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12)) brightness(1.02) contrast(1.02)',
            }}
            imagePlaceCenter={true}
            showControl={false}
          />
          {!imageSrc && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
              <ImagePicker />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />

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

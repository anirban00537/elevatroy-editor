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
        className="transform-gpu transition-transform duration-200 ease-out"
        style={scaleStyle}
      >
        <div 
          className="my-node relative bg-dark-200 rounded-xl shadow-2xl" 
          style={nodeStyle} 
          ref={containerRef}
        >
          <ImageWithControls
            src={imageSrc ?? ''}
            id={0}
            handleRemove={handleRemove}
            keepRatio={true}
            style={imageStyle}
            imagePlaceCenter={true}
            showControl={false}
          />
          {!imageSrc && (
            <div className="absolute inset-0 flex items-center justify-center">
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

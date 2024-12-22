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
  const {
    nodeStyle,
    imageSrc,
    scaleStyle,
    imageStyle,
    waterMark,
    canvasTexts,
  } = useImageCanvas(image);
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
    <div style={scaleStyle}>
      <div className="my-node" style={nodeStyle} ref={containerRef}>
        <ImageWithControls
          // @ts-ignore
          src={imageSrc}
          id={0}
          handleRemove={handleRemove}
          keepRatio={true}
          style={imageStyle}
          imagePlaceCenter={true}
          showControl={false}
        />
        {!imageSrc && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

        {waterMark && (
          <div className="absolute bottom-10 right-10 flex items-center justify-center gap-1 text-white text-opacity-70 text-sm bg-blur-sm p-3 bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
            <img src="/nameless-logo.png" className="w-10" alt="watermark" />
            <div className="flex flex-col">
              <span className="text-[10px]">Built with </span>
              <span className="font-bold">Moiful.com</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCanvas;

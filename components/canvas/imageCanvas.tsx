import React, { useState, useRef, useEffect } from "react";
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
import { setSelectedTexts, setActiveText } from "@/store/slice/editor.slice";

interface ImageCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ containerRef }) => {
  const { nodeStyle, scaleStyle, imageStyle } = useImageCanvas(null);
  const image = useSelector((state: RootState) => state.editor.image);
  const { elements } = useSelector((state: RootState) => state.editor);
  const { shadowSettings } = useSelector((state: RootState) => state.editor);
  const textElements = useSelector(
    (state: RootState) => state.editor.textElements
  );
  const selectedTexts = useSelector(
    (state: RootState) => state.editor.selectedTexts
  );
  const canvasTexts = useSelector(
    (state: RootState) => state.editor.canvasTexts
  );

  const [isResizable, setIsResizable] = useState(false);
  const dispatch = useDispatch();
  const handleImageClick = () => {
    setIsResizable(!isResizable);
  };
  const handleRemove = (id: any) => {
    dispatch(removeElement(id));
  };

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const isInsideCanvas = canvasRef.current?.contains(event.target as Node);
      const isControlElement = (event.target as Element)?.closest(
        ".control-element"
      );
      const isTextControl = (event.target as Element)?.closest(
        "[data-text-control]"
      );
      const isSidebar = (event.target as Element)?.closest("#sidebar");

      if (
        isInsideCanvas &&
        !isControlElement &&
        !isTextControl &&
        !isSidebar &&
        event.target === canvasRef.current
      ) {
        dispatch(setSelectedTexts([]));
        dispatch(setActiveText(null));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);

  // Create shadow style based on settings
  const shadowStyle = shadowSettings.enabled
    ? {
        boxShadow: `${shadowSettings.inset ? "inset " : ""}${
          shadowSettings.offsetX
        }px ${shadowSettings.offsetY}px ${shadowSettings.blur}px ${
          shadowSettings.spread
        }px ${shadowSettings.color}${Math.round(shadowSettings.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      }
    : {};

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="relative transform-gpu transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.005]"
        style={scaleStyle}
      >
        <div
          ref={containerRef}
          className="my-node relative bg-dark-200/90 rounded-xl transition-all duration-300 backdrop-blur-xl"
          style={{
            ...nodeStyle,
            ...shadowStyle,
          }}
        >
          {image ? (
            <div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ImageWithControls
                src={typeof image === "string" ? image : image.src}
                id={0}
                handleRemove={handleRemove}
                keepRatio={true}
                style={imageStyle}
                imagePlaceCenter={true}
                showControl={false}
              />
            </div>
          ) : (
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
          {textElements.map((textElement) => (
            <DraggableText
              key={textElement.id}
              property={{
                ...textElement,
                x: textElement.position.x,
                y: textElement.position.y,
                id: textElement.id,
                text: textElement.text,
                fontSize: textElement.fontSize,
                fontFamily: textElement.fontFamily,
                fontWeight: textElement.fontWeight,
                color: textElement.color,
                textDecoration: textElement.textDecoration,
                fontStyle: textElement.fontStyle,
                width: textElement.width,
                height: textElement.height,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;

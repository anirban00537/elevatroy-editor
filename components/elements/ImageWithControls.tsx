import React, { useState, useEffect, useRef } from "react";
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  Rotatable,
  Draggable,
  Scalable,
} from "react-moveable";
import MoveableHelper from "moveable-helper";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import FrameWrapper from "../frames";
import { imageShadowPresets } from "@/helpers/core-constants";

interface ImageWithControlsProps {
  src: string;
  handleRemove: any;
  id: number;
  keepRatio?: boolean;
  draggable?: boolean;
  scalable?: boolean;
  rotatable?: boolean;
  style?: any;
  showControl?: boolean;
  imagePlaceCenter?: boolean;
}

const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
  Rotatable,
]);

const ImageWithControls: React.FC<ImageWithControlsProps> = ({
  src,
  id,
  handleRemove,
  keepRatio = true,
  draggable = true,
  scalable = true,
  rotatable = true,
  imagePlaceCenter = false,
  showControl = true,
  style,
}) => {
  const [helper] = React.useState(() => {
    return new MoveableHelper();
  });
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const targetRef: any = useRef<HTMLDivElement>(null);
  const imageRef: any = useRef<HTMLImageElement>(null);

  const handleContainerClick = () => {
    setIsControlsVisible((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(event.target as Node)
    ) {
      setIsControlsVisible(false);
    }
  };

  const handleKeyDown: any = (event: React.KeyboardEvent) => {
    if (event.keyCode === 46) {
      handleRemove(id);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const {
    translateX,
    translateY,
    imageRadius,
    contentScale,
    fixedTextProperties,
    imageShadow,
  } = useSelector((state: RootState) => state.editor);

  const containerStyle: React.CSSProperties = imagePlaceCenter
    ? {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        transform: `translate(${translateX}%, ${translateY}%) scale(${contentScale})`,
        transition: "all 0.5s ease-out 0s",
      }
    : {
        position: "relative",
        width: imageRef.current?.naturalWidth || "100%",
        height: imageRef.current?.naturalHeight || "100%",
      };

  return (
    <div
      style={containerStyle}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        ref={targetRef}
        style={{
          display: "flex",
          //@ts-ignore
          flexDirection: fixedTextProperties?.direction,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        }}
      >
        {fixedTextProperties.status && (
          <div
            className="flex flex-col m-10 items-center justify-center gap-2"
            style={{
              minWidth: "80%",
            }}
          >
            <h1
              className=""
              style={{
                fontSize: fixedTextProperties.titleProperties.fontSize,
                color: fixedTextProperties.titleProperties.color,
                textAlign: "center",
                overflowWrap: "break-word",
                fontWeight: "bold",
              }}
            >
              {fixedTextProperties.titleProperties.value}
            </h1>
            <h1
              className=""
              style={{
                fontSize: fixedTextProperties.descriptionProperties.fontSize,
                color: fixedTextProperties.descriptionProperties.color,
                overflowWrap: "break-word",
                textAlign: "center",
              }}
            >
              {fixedTextProperties.descriptionProperties.value}
            </h1>
          </div>
        )}
        {src && (
          <div style={style}>
            <FrameWrapper>
              <img
                ref={imageRef}
                src={src}
                className="w-full h-full"
                style={{
                  borderRadius: `${imageRadius}px`,
                  boxShadow: imageShadowPresets[imageShadow].value,
                }}
                onLoad={() => {
                  setIsControlsVisible(!isControlsVisible);
                }}
              />
            </FrameWrapper>
          </div>
        )}
      </div>
      {isControlsVisible && showControl && (
        <Moveable
          target={targetRef}
          draggable={draggable}
          scalable={scalable}
          keepRatio={keepRatio}
          rotatable={rotatable}
          onDragStart={helper.onDragStart}
          onDrag={helper.onDrag}
          onScaleStart={helper.onScaleStart}
          onScale={helper.onScale}
          onRotateStart={helper.onRotateStart}
          onRotate={helper.onRotate}
        />
      )}
    </div>
  );
};

export default ImageWithControls;

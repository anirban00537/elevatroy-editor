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

interface ElementsWithControlsProps {
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

const ElementsWithControls: React.FC<ElementsWithControlsProps> = ({
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

  // Use natural dimensions of the image for container size
  const containerStyle: React.CSSProperties = imagePlaceCenter
    ? {
        position: "absolute",
        width: imageRef.current?.naturalWidth || "100%",
        height: imageRef.current?.naturalHeight || "100%",
      }
    : {
        position: "absolute",
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          ref={imageRef}
          src={src}
          style={style}
          className="w-full h-full"
          onLoad={() => {
            // Trigger a re-render when the image has loaded
            setIsControlsVisible(!isControlsVisible);
          }}
        />
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

export default ElementsWithControls;

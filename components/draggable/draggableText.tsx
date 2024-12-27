import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import {
  setActiveTab,
  setTextEditing,
  updateTextById,
  setActiveText,
  setSelectedTexts,
} from "@/store/slice/editor.slice";
import { RootState } from "@/store";

interface DraggableTextProps {
  property: any;
}

const DraggableText: React.FC<DraggableTextProps> = memo(({ property }) => {
  const dispatch = useDispatch();
  const selectedTexts = useSelector(
    (state: RootState) => state.editor.selectedTexts
  );
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: property.x, y: property.y });
  const [dimensions, setDimensions] = useState({
    width: property.width || 200,
    height: property.height || 100,
  });

  const handleDragStop: RndDragCallback = useCallback((e, d) => {
    setPosition({ x: d.x, y: d.y });
  }, []);

  const handleResize: RndResizeCallback = useCallback(
    (e, direction, ref, delta, newPosition) => {
      const newWidth = parseFloat(ref.style.width);
      const newHeight = parseFloat(ref.style.height);
      setDimensions({ width: newWidth, height: newHeight });
      setPosition(newPosition);
    },
    []
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (e.shiftKey) {
      if (selectedTexts.includes(property.id)) {
        dispatch(
          setSelectedTexts(selectedTexts.filter((id) => id !== property.id))
        );
      } else {
        dispatch(setSelectedTexts([...selectedTexts, property.id]));
      }
    } else {
      dispatch(setActiveText(property.id));
      dispatch(setSelectedTexts([property.id]));
    }

    setIsControlsVisible(true);
    dispatch(setActiveTab("draggableText"));
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if click is inside text management, sidebar, or the text itself
      const isTextManagement = (event.target as Element)?.closest(
        "#text-management"
      );
      const isSidebar = (event.target as Element)?.closest("#sidebar");
      const isInsideText = targetRef.current?.contains(event.target as Node);
      const isTextControl = (event.target as Element)?.closest(
        "[data-text-control]"
      );

      // Only deselect if click is outside all relevant areas
      if (!isTextManagement && !isSidebar && !isInsideText && !isTextControl) {
        setIsControlsVisible(false);
        dispatch(setSelectedTexts([]));
        dispatch(setActiveText(null));
      }

      // Keep controls visible if clicking inside text or controls
      if (isInsideText || isTextManagement || isTextControl) {
        setIsControlsVisible(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);

  return (
    <div
      onClick={handleClick}
      tabIndex={0}
      ref={targetRef}
      className="absolute z-20"
    >
      <Rnd
        position={position}
        size={dimensions}
        onDragStop={handleDragStop}
        onResize={handleResize}
        style={{
          display: "flex",
          color: property.color,
          fontFamily: property.fontFamily,
          alignItems: "start",
          justifyContent: "start",
          textDecoration: property.textDecoration,
          fontStyle: property.fontStyle,
          fontSize: `${property.fontSize}px`,
          fontWeight: property.fontWeight,
          background: "transparent",
          cursor: isControlsVisible ? "move" : "default",
          border: "1px dashed transparent",
          borderColor: isControlsVisible ? "#00f" : "transparent",
          borderRadius: "4px",
          zIndex: isControlsVisible ? 30 : 20,
          position: "relative",
        }}
      >
        <textarea
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            cursor: isControlsVisible ? "move" : "text",
            outline: "none",
            background: "transparent",
            padding: "0",
            margin: "0",
            resize: "none",
            overflow: "hidden",
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            position: "relative",
            zIndex: 1,
          }}
          value={property.text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(
              updateTextById({
                id: property.id,
                text: e.target.value,
              })
            );
          }}
          spellCheck={false}
        />

        {isControlsVisible && (
          <>
            <div
              style={{
                position: "absolute",
                top: "-5px",
                left: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "ns-resize",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-5px",
                top: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "ew-resize",
                transform: "translate(50%, -50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "ns-resize",
                transform: "translate(-50%, 50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "-5px",
                top: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "ew-resize",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "nwse-resize",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "nesw-resize",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "-5px",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "nesw-resize",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                right: "-5px",
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                cursor: "nwse-resize",
              }}
            />
          </>
        )}
      </Rnd>
    </div>
  );
});

DraggableText.displayName = "DraggableText";
export default DraggableText;

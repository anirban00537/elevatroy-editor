import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
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

const DraggableText: React.FC<DraggableTextProps> = ({ property }: any) => {
  const dispatch = useDispatch();
  const selectedTexts = useSelector((state: RootState) => state.editor.selectedTexts);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFocus = () => {
    dispatch(setTextEditing(property));
    setIsControlsVisible(true);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(event.target as Node)
    ) {
      setIsControlsVisible(false);
    }
  };

  const handleResizeStop = (
    _: any,
    __: any,
    ref: any,
    delta: any,
    position: any
  ) => {
    // Implement any logic you need after resizing stops
  };

  const resizeHandleComponent = isControlsVisible ? (
    <div
      style={{
        width: "20px",
        height: "20px",
        background: "#fff",
        border: "2px solid #fff",
        borderRadius: "50%",
      }}
    />
  ) : undefined;

  const handleContainerClick = () => {
    setIsControlsVisible((prev) => !prev);
    dispatch(setActiveTab("draggableText"));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (e.shiftKey) {
      // Multi-select with shift
      if (selectedTexts.includes(property.id)) {
        dispatch(setSelectedTexts(selectedTexts.filter(id => id !== property.id)));
      } else {
        dispatch(setSelectedTexts([...selectedTexts, property.id]));
      }
    } else {
      // Single select
      dispatch(setActiveText(property.id));
      dispatch(setSelectedTexts([property.id]));
    }
    
    setIsControlsVisible(true);
  };

  return (
    <div onClick={handleClick} tabIndex={0} ref={targetRef}>
      <Rnd
        onClick={handleContainerClick}
        default={{
          x: property.x || 0,
          y: property.y || 0,
          width: property.width || 200,
          height: property.height || 100,
        }}
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
          border: selectedTexts.includes(property.id) ? "2px solid #ffffff52" : "none",
          padding: "",
        }}
        resizeHandleComponent={{
          topLeft: resizeHandleComponent,
          topRight: resizeHandleComponent,
          bottomLeft: resizeHandleComponent,
          bottomRight: resizeHandleComponent,
        }}
        onResizeStop={handleResizeStop}
      >
        <textarea
          onFocus={handleFocus}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            cursor: isControlsVisible ? "move" : "default",
            outline: "none",
            background: "transparent",
            padding: "0",
            margin: "0",
            resize: "none", // To prevent resizing of the textarea
            overflow: "hidden", // Hide the scrollbar
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
          spellCheck={false} // Disable spell checking
        />
      </Rnd>
    </div>
  );
};

export default DraggableText;

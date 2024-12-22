import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { addElement, setCanvasTexts } from "@/store/slice/editor.slice";
import { RootState } from "@/store";
import {  Type } from "lucide-react";
import { imageEditorItems } from "@/helpers/core-constants";

const ElementsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { image } = useSelector((state: RootState) => state.editor);
  const [index, setIndex] = useState<number>(1);

  const addElementToState = (path: any) => {
    if (!image) {
      return;
    }
    dispatch(
      addElement({
        id: Math.random().toString(36).substr(2, 9) + Date.now(),
        path,
      })
    );
  };

  const elementVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };
  const handleAddText = () => {
    dispatch(
      setCanvasTexts({
        id: Math.random() + Date.now(),
        text: "Text-" + index,
        x: 100,
        y: 100,
        width: 400,
        height: 100,
        fontSize: 39,
        color: "#ffff",
        fontWeight: "normal",
        fontFamily: "sans-serif",
        textDecoration: "none",
        fontStyle: "oblique",
      })
    );
    setIndex(index + 1);
  };
  return (
    <div className="gap-1 grid grid-cols-5 items-center justify-start text-zinc-200 
      text-[10px] rounded-md w-full h-14 mt-3">
      <motion.div
        className="flex flex-col rounded-sm bg-dark-200 border-dark-border/20 border 
          items-center justify-center py-4 cursor-pointer hover:bg-dark-300"
        whileHover="hover"
        onClick={handleAddText}
        whileTap="tap"
        variants={elementVariants}
      >
        <div className="rounded-md">
          <Type size={16} />
        </div>
      </motion.div>
      {imageEditorItems.map(({ id, path }, i) => (
        <motion.div
          className="flex flex-col border-dark-border/20 bg-dark-200 border 
            items-center justify-center rounded-sm py-4 cursor-pointer hover:bg-dark-300"
          onClick={() => addElementToState(path)}
          key={i}
          whileHover="hover"
          whileTap="tap"
          variants={elementVariants}
        >
          <div className="rounded-md">
            <img
              src={path}
              alt={`Element ${i}`}
              className="w-4 h-4 text-zinc-200"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ElementsSection;

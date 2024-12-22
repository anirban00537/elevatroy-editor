import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, Pencil, Plus } from "lucide-react";
import FixedTextSection from "@/components/textEditingControls/fixedTextSection";
import TextProperty from "@/components/textEditingControls/text-property";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setCanvasTexts, setActiveTab } from "@/store/slice/editor.slice";

const TextSection = () => {
  const { canvasTexts, activeTab } = useSelector(
    (state: RootState) => state.editor
  );
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<"fixed" | "texts">("fixed");

  useEffect(() => {
    activeTab === "draggableText" && setSelectedTab("texts");
  }, [activeTab]);
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
  const slideUpAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col items-start justify-between h-full z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <ArrowLeft
        className="text-zinc-200 cursor-pointer mb-4"
        size={24}
        onClick={() => dispatch(setActiveTab("image"))}
      />

      <motion.div
        variants={slideUpAnimation}
        className="grid grid-cols-2 w-full border rounded-lg border-dark-border/20 
          gap-2 text-zinc-200 mb-4"
      >
        <motion.div
          className={`p-2 m-1 rounded-md text-xs flex items-center justify-center cursor-pointer 
            ${selectedTab === "fixed" ? "bg-dark-300 text-zinc-200" : ""}`}
          onClick={() => setSelectedTab("fixed")}
        >
          Fixed Text
        </motion.div>
        <motion.div
          className={`p-2 m-1 rounded-md text-xs flex items-center justify-center cursor-pointer 
            ${selectedTab === "texts" ? "bg-dark-300 text-zinc-200" : ""}`}
          onClick={() => setSelectedTab("texts")}
        >
          Draggable Text
        </motion.div>
      </motion.div>

      {selectedTab === "fixed" && <FixedTextSection />}
      {selectedTab === "texts" && (
        <>
          <div className="mt-4 w-full">
            <button
              className="cursor-pointer p-3 w-full border border-dark-border/20 text-xs 
                px-2 rounded-md flex items-center justify-center text-zinc-200 mt-4 
                md:mt-0 bg-dark-200 hover:bg-dark-300"
              style={{ width: "100%" }}
              type="button"
              onClick={handleAddText}
            >
              Add Text <Plus size={14} className="ml-2" />
            </button>
          </div>

          <div className="w-full mt-4 md:mt-0 overflow-y-auto">
            {canvasTexts.map((text: any, index: number) => (
              <TextProperty text={text} key={index} index={index} />
            ))}
          </div>

          {canvasTexts.length === 0 && (
            <div className="w-full border border-dark-border/20 rounded-md py-16 mt-6 
              flex items-center justify-center bg-dark-200">
              <p className="text-zinc-400 text-sm">
                <Pencil className="inline-block mr-2" size={12} />
                No Texts Added
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default TextSection;

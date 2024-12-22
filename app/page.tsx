"use client";
import React, { useEffect } from "react";
import ImageCanvas from "@/components/canvas/imageCanvas";
import UnifiedSidebar from "@/components/sidebar/UnifiedSidebar";
import {
  useExport,
  useRandomColorFromPallet,
} from "@/hooks/useScreenshotEditor";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditorNavbar from "@/components/navbar/editorNav";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const {
    handleExport,
    handlePaste,
    containerRef,
    handleFileInputChange,
    handleCopyImageToClipboard,
    image,
  } = useExport();
  useRandomColorFromPallet();
  const { height, width } = useSelector((state: RootState) => state.editor);
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    const handlePasteGlobal = (e: any) => {
      handlePaste(e);
    };

    document.addEventListener("paste", handlePasteGlobal);

    return () => {
      document.removeEventListener("paste", handlePasteGlobal);
    };
  }, [handlePaste]);

  return (
    <div className="bg-dark-950">
      <EditorNavbar
        handleExport={handleExport}
        handleCopyImageToClipboard={handleCopyImageToClipboard}
      />
      <div className="flex flex-col md:flex-row items-start">
        <UnifiedSidebar
          handleFileInputChange={handleFileInputChange}
          handleExport={handleExport}
          image={image}
        />

        <div className="w-full md:ml-[380px]">
          <main className="min-h-screen">
            <AnimatePresence>
              <motion.div
                variants={fadeInAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center min-h-screen p-5"
              >
                <ImageCanvas image={image} containerRef={containerRef} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;

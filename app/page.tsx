"use client";
import React, { useEffect } from "react";
import ImageCanvas from "@/components/canvas/imageCanvas";
import Sidebar from "@/components/sidebar";
import {
  useExport,
  useRandomColorFromPallet,
} from "@/hooks/useScreenshotEditor";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditorNavbar from "@/components/navbar/editorNav";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundSection from "@/components/LeftSidebarSection";

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
      <div className="flex flex-col-reverse md:flex-row items-start justify-center">
        <div className="w-full bg-dark-950">
          <main className="sticky top-0 z-10 md:z-0 md:relative bg-dark-950 md:bg-transparent">
            <AnimatePresence>
              <motion.div
                variants={fadeInAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex items-center h-[200px] md:h-screen md:min-h-screen 
                  max-h-screen justify-center md:flex-grow-0 md:flex-basis-2/3 mx-5 
                  flex-col md:justify-center"
              >
                <ImageCanvas image={image} containerRef={containerRef} />
              </motion.div>
            </AnimatePresence>
          </main>

          <div className="md:flex flex-col items-start justify-center md:items-start 
            md:justify-start md:flex-grow-0 md:flex-basis-1/3 md:mt-[65px] md:fixed 
            md:top-0 md:left-0 md:h-screen">
            <BackgroundSection />
          </div>

          <div className="md:flex flex-col items-center justify-center md:items-start 
            md:justify-start md:flex-grow-0 md:flex-basis-1/3 md:mt-[65px] md:fixed 
            md:top-0 md:right-0 md:h-screen z-30">
            <Sidebar
              handleFileInputChange={handleFileInputChange}
              handleExport={handleExport}
              width={width}
              height={height}
              image={image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

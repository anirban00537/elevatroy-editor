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
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setImage } from "@/store/slice/editor.slice";
import DevelopmentContact from "@/components/contact/DevelopmentContact";

export default function Home() {
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
    <main className="flex min-h-screen bg-dark-200 relative">
      {/* Main Content Area */}
      <div className="flex-1 mr-[300px]">
        <div className="w-full h-screen flex items-center justify-center">
          <ImageCanvas containerRef={containerRef} />
        </div>
      </div>

      {/* Sidebar */}
      <UnifiedSidebar
        handleFileInputChange={handleFileInputChange}
        handleExport={handleExport}
        handleCopyImageToClipboard={handleCopyImageToClipboard}
        image={image}
      />

      <DevelopmentContact />
    </main>
  );
}

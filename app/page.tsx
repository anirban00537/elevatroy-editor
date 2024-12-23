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
    <main className="flex min-h-screen bg-[#0D0D12] overflow-hidden">
      {/* Sidebar */}
      <UnifiedSidebar
        handleFileInputChange={handleFileInputChange}
        handleExport={handleExport}
        handleCopyImageToClipboard={handleCopyImageToClipboard}
        image={image}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-[320px] relative">
        <div className="absolute inset-0 flex items-center justify-center p-8 overflow-hidden">
          <ImageCanvas image={image} containerRef={containerRef} />
        </div>
      </div>
    </main>
  );
}

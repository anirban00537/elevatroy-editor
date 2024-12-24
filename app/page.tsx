"use client";
import React, { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
    <main className="flex flex-col lg:flex-row min-h-screen bg-dark-200 relative">
      {/* Main Content Area */}
      <div className="flex-1 lg:mr-[300px] w-full">
        <div className="w-full h-screen flex items-center justify-center p-4">
          <ImageCanvas containerRef={containerRef} />
        </div>
      </div>

      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed right-4 top-4 z-50 lg:hidden bg-dark-300 p-2 rounded-full border border-dark-100"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-gray-400" />
        ) : (
          <Menu className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out z-40",
          "w-full sm:w-[380px] lg:w-[300px]",
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <UnifiedSidebar
          handleFileInputChange={handleFileInputChange}
          handleExport={handleExport}
          handleCopyImageToClipboard={handleCopyImageToClipboard}
          image={image}
        />
      </div>

      <DevelopmentContact />
    </main>
  );
}

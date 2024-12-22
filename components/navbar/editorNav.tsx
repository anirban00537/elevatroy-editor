import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Sidebar from "@/components/sidebar";
import CanvasInputSize from "../canvasSize/canvasInputSize";
import toast from "react-hot-toast";

import { useExport } from "@/hooks/useScreenshotEditor";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FaBars } from "react-icons/fa";
import { ArrowRight, Copy, Download } from "lucide-react";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import CanvasSize from "../canvasSize";
import Confetti from "react-confetti";
import BuyMeACoffee from "../buyMeACofeeButton";

export default function EditorNavbar({
  handleExport,
  handleCopyImageToClipboard,
  showCanvasSize = true,
}: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { handleFileInputChange, image } = useExport();

  const { height, width } = useSelector((state: RootState) => state.editor);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleExportWithConfetti = () => {
    handleExport(width, height);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 2 seconds
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className="bg-dark border-b border-dark-border/20 sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            {/* Adjusted padding for smaller screens */}
            <div className="relative flex h-16 items-center justify-between">
              <div className="hidden  md:flex md:flex-1 sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-0 md:gap-3">
                <button
                  onClick={handleExportWithConfetti}
                  className="md:inline-flex h-10 items-center md:mr-3 hidden justify-center rounded-md 
                    border border-dark-border bg-dark-200 px-6 font-medium text-xs text-zinc-200 
                    shadow-lg transition-colors hover:bg-dark-300 focus:outline-none"
                >
                  Download Image
                  <Download size={14} className="ml-1" />
                </button>
                <button
                  onClick={handleCopyImageToClipboard}
                  className="cursor-pointer p-2 bg-dark-200 border border-dark-border shadow-lg 
                    text-[12px] px-2 rounded-md flex items-center justify-center text-zinc-200 
                    hover:bg-dark-300"
                >
                  <Copy size={14} className="ml-1" />
                </button>

                <label
                  onClick={handleExportWithConfetti}
                  className="cursor-pointer p-2 bg-dark-200 border border-dark-border shadow-lg mr-3 
                    text-[12px] px-2 rounded-md flex items-center justify-center md:hidden 
                    text-zinc-200 hover:bg-dark-300"
                >
                  <Download size={14} className="" />
                </label>
                {showCanvasSize && (
                  <div className="hidden md:flex items-center mr-3 space-x-4 border 
                    border-dark-border rounded-lg bg-dark-200 p-1">
                    <CanvasInputSize />
                    <CanvasSize />
                  </div>
                )}

                <a
                  href="https://www.linkedin.com/in/anirban00537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center justify-center space-x-4"
                >
                  <label className="cursor-pointer p-2 bg-dark-200 border border-dark-border 
                    shadow-lg text-[12px] px-2 rounded-md flex items-center justify-center 
                    text-zinc-200 hover:bg-dark-300">
                    Hire Me <ArrowRight className="ml-1" size={16} />
                  </label>
                </a>
                

                <a
                  href="https://www.linkedin.com/in/anirban00537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-4 md:hidden"
                >
                  <label className="cursor-pointer p-2 bg-dark-200 border border-dark-border 
                    shadow-lg text-[12px] px-2 rounded-md flex items-center justify-center 
                    text-zinc-200 hover:bg-dark-300">
                    <ArrowRight className="ml-1" size={16} />
                  </label>
                </a>
              </div>
              {showCanvasSize && (
                <div className="flex items-center  justify-center space-x-4 border 
                  border-dark-border rounded-lg md:hidden bg-dark-200 p-1">
                  <CanvasInputSize />
                  <CanvasSize />
                </div>
              )}

              <div className="md:hidden flex items-center">
                <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
                  <DrawerTrigger
                    className="cursor-pointer"
                    onClick={handleDrawerToggle}
                  >
                    <div className="hidden text-zinc-200 p-2 border border-dark-border 
                      rounded-lg focus:outline-none items-center space-x-1 bg-dark-200">
                      <FaBars />
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="flex items-center justify-center bg-dark 
                    border border-dark-border w-full">
                    <Sidebar
                      handleFileInputChange={handleFileInputChange}
                      handleExport={handleExport}
                      width={width}
                      height={height}
                      image={image}
                    />
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
          <div className="hidden">
            <Sidebar
              handleFileInputChange={handleFileInputChange}
              handleExport={handleExport}
              width={width}
              height={height}
              image={image}
            />
          </div>
        </>
      )}
    </Disclosure>
  );
}

import { useExport } from "@/hooks/useScreenshotEditor";
import { Upload, Image as ImageIcon, ArrowDown } from "lucide-react";
import React, { useState } from "react";

const ImagePicker = () => {
  const { handleImageUploadDrop } = useExport();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    try {
      await handleImageUploadDrop(e.dataTransfer.files);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div
      className={`relative group ${
        isDragging ? "scale-105" : ""
      } transition-transform duration-300`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Outer Glow */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-zinc-400/20 via-zinc-300/10 to-zinc-400/20 rounded-2xl blur-lg" />
      
      {/* Inner Border Gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-zinc-500/30 via-zinc-300/20 to-zinc-500/30 rounded-xl" />
      
      <label
        htmlFor="fileInput"
        className="relative block p-10 
          bg-gradient-to-b from-zinc-800/95 via-zinc-900/95 to-zinc-950/95 
          backdrop-blur-sm rounded-xl cursor-pointer overflow-hidden
          group-hover:from-zinc-700/95 group-hover:via-zinc-800/95 group-hover:to-zinc-900/95 
          transition-all duration-300"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] group-hover:opacity-[0.04] transition-opacity" />
        
        <div className="relative flex flex-col items-center gap-8 px-6 py-12">
          {/* Icon Container */}
          <div className="relative">
            {/* Icon Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-zinc-300/30 to-zinc-500/0 
              rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative w-20 h-20 rounded-full 
              bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900
              flex items-center justify-center
              border border-zinc-600/30 group-hover:border-zinc-500/50 
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_0_1px_rgba(0,0,0,0.2)]
              transition-all duration-300"
            >
              <ImageIcon size={28} className="text-zinc-400 group-hover:text-zinc-300 
                transform group-hover:scale-110 transition-all duration-300" 
              />
            </div>
            
            {/* Animated Arrow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <ArrowDown size={16} className="text-zinc-500/50 animate-bounce" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-3">
            <p className="text-sm font-medium bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 
              bg-clip-text text-transparent">
              Paste your image by pressing
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <kbd className="px-3 py-2 
                bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900
                rounded-lg border border-zinc-700/50 text-zinc-400
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)]
                group-hover:from-zinc-600 group-hover:via-zinc-700 group-hover:to-zinc-800
                transition-all duration-300">
                CTRL + V
              </kbd>
              <span className="text-zinc-600">or</span>
              <kbd className="px-3 py-2 
                bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900
                rounded-lg border border-zinc-700/50 text-zinc-400
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)]
                group-hover:from-zinc-600 group-hover:via-zinc-700 group-hover:to-zinc-800
                transition-all duration-300">
                ⌘ + V
              </kbd>
            </div>
            <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
              Alternatively, click to choose or drop your file here
            </p>
          </div>
        </div>
      </label>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImagePicker;

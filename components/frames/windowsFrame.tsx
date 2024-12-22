import React, { ReactNode } from "react";
import { Minus, Square, X } from "lucide-react";

const Windows10WindowFrame: React.FC<{
  children: ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <div className="relative bg-white border border-gray-400 rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center justify-between bg-gray-300 border-b border-gray-400 px-3 py-1">
        <div className="text-gray-700 text-sm font-medium">{title}</div>
        <div className="flex gap-1">
          <button className="bg-[#F0F0F0] hover:bg-[#DADADA] rounded-md p-1 focus:outline-none">
            <Minus className="w-4 h-4 text-gray-700" />
          </button>
          <button className="bg-[#F0F0F0] hover:bg-[#DADADA] rounded-md p-1 focus:outline-none">
            <Square className="w-4 h-4 text-gray-700" />
          </button>
          <button className="bg-[#F0F0F0] hover:bg-[#DADADA] rounded-md p-1 focus:outline-none">
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Windows10WindowFrame;

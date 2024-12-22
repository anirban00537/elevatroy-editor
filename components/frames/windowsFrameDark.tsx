import React, { ReactNode } from "react";
import { Minus, Square, X } from "lucide-react";

const DarkWindows10WindowFrame: React.FC<{
  children: ReactNode;
  title?: string;
}> = ({ children, title }) => {
  return (
    <div className="relative bg-gray-800 border border-gray-600 rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center justify-between bg-gray-700 border-b border-gray-600 px-3 py-1">
        <div className="text-gray-300 text-sm font-medium">{title}</div>
        <div className="flex gap-1">
          <button className="bg-gray-600 hover:bg-gray-500 rounded-md p-1 focus:outline-none">
            <Minus className="w-4 h-4 text-gray-300" />
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 rounded-md p-1 focus:outline-none">
            <Square className="w-4 h-4 text-gray-300" />
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 rounded-md p-1 focus:outline-none">
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DarkWindows10WindowFrame;

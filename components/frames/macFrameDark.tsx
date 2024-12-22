import React, { ReactNode } from "react";

const DarkMacWindowFrame: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative bg-gray-800 border border-gray-600 rounded-lg overflow-hidden shadow-md">
      <div className="bg-gray-700 flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
        </div>
        <div className="text-sm font-medium text-gray-400">{title}</div>
        <div className="flex items-center gap-1"></div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default DarkMacWindowFrame;

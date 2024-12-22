import React, { ReactNode } from "react";

const MacWindowFrame: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <div className="bg-gray-100 flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          {" "}
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        </div>
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div className="flex items-center gap-1"></div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default MacWindowFrame;

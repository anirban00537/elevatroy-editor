import React, { ReactNode } from "react";

const FancyFrame: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-600 rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center h-10 justify-between bg-purple-700 border-b border-purple-800  ">
        <div className="text-white text-sm font-medium ml-3">{title} </div>
        <div className="flex gap-1"></div>
      </div>
      <div className="p-1">{children}</div>
    </div>
  );
};

export default FancyFrame;

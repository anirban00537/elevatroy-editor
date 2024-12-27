import React, { ReactNode } from "react";

const DarkGlassFrame: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-[1px] rounded-xl">
        <div className="absolute inset-0 border border-black/20 rounded-xl bg-black/20 backdrop-blur-sm" />
      </div>
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
};

export default DarkGlassFrame;

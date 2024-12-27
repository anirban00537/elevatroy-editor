import React, { ReactNode } from "react";

const GlassFrame: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-[1px] rounded-xl">
        <div className="absolute inset-0 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm" />
      </div>
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
};

export default GlassFrame;

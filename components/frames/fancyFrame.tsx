import React, { ReactNode } from "react";

const FancyFrame: React.FC<{ children: ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative w-full h-full p-[1px] rounded-xl">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500" />
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default FancyFrame;

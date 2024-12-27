import React, { ReactNode } from "react";

const MacWindowFrame: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Glass background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff08] to-[#ffffff03] border border-white/10" />

      {/* Title bar */}
      <div className="relative h-7 flex items-center justify-between px-3 border-b border-white/5">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" />
        </div>

        {/* Window title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs font-medium text-white/60">{title}</span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm border border-white/10 bg-white/5" />
        </div>
      </div>

      {/* Content area */}
      <div className="relative w-full h-[calc(100%-28px)]">{children}</div>
    </div>
  );
};

export default MacWindowFrame;

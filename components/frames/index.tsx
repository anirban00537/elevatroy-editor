import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FramesID } from "@/helpers/core-constants";
import GlassFrame from "./glassFrame";
import DarkGlassFrame from "./glassFrameDark";
import FancyFrame from "./fancyFrame";

const FrameWrapper = ({ children }: { children: React.ReactNode }) => {
  const { frame } = useSelector((state: RootState) => state.editor);
  const { frameId, frameTitle } = frame;

  const renderFrame = () => {
    switch (frameId) {
      case FramesID.GLASS_FRAME:
        return <GlassFrame>{children}</GlassFrame>;

      case FramesID.DARK_GLASS_FRAME:
        return <DarkGlassFrame>{children}</DarkGlassFrame>;

      case FramesID.MAC_FRAME:
        return (
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#ffffff08] to-[#ffffff03]">
            <div className="h-6 bg-[#ffffff08] flex items-center gap-1.5 px-2 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="w-full h-[calc(100%-24px)]">{children}</div>
          </div>
        );

      case FramesID.DARK_MAC_FRAME:
        return (
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-black/20 bg-gradient-to-b from-[#00000040] to-[#00000020]">
            <div className="h-6 bg-[#00000040] flex items-center gap-1.5 px-2 border-b border-black/10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="w-full h-[calc(100%-24px)]">{children}</div>
          </div>
        );

      case FramesID.WINDOWS_FRAME:
        return (
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#ffffff08] to-[#ffffff03]">
            <div className="h-6 bg-[#ffffff08] flex items-center justify-between px-2 border-b border-white/5">
              <span className="text-xs text-white/60">{frameTitle}</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 flex items-center justify-center text-white/60">−</div>
                <div className="w-3 h-3 flex items-center justify-center text-white/60">□</div>
                <div className="w-3 h-3 flex items-center justify-center text-white/60">×</div>
              </div>
            </div>
            <div className="w-full h-[calc(100%-24px)]">{children}</div>
          </div>
        );

      case FramesID.DARK_WINDOWS_FRAME:
        return (
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-black/20 bg-gradient-to-b from-[#00000040] to-[#00000020]">
            <div className="h-6 bg-[#00000040] flex items-center justify-between px-2 border-b border-black/10">
              <span className="text-xs text-white/40">{frameTitle}</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 flex items-center justify-center text-white/40">−</div>
                <div className="w-3 h-3 flex items-center justify-center text-white/40">□</div>
                <div className="w-3 h-3 flex items-center justify-center text-white/40">×</div>
              </div>
            </div>
            <div className="w-full h-[calc(100%-24px)]">{children}</div>
          </div>
        );

      case FramesID.FANCY_FRAME:
        return <FancyFrame title={frameTitle}>{children}</FancyFrame>;

      default:
        return children;
    }
  };

  return renderFrame();
};

export default FrameWrapper;

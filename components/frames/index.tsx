import React from "react";
import GlassFrame from "../frames/glassFrame";
import MacWindowFrame from "../frames/macFrame";
import Windows10WindowFrame from "./windowsFrame";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FramesID } from "@/helpers/core-constants";
import DarkWindows10WindowFrame from "./windowsFrameDark";
import DarkMacWindowFrame from "./macFrameDark";
import DarkBasicFrame from "./glassFrameDark";
import FancyFrame from "./fancyFrame";

const FrameWrapper = ({ children }: { children: React.ReactNode }) => {
  const { frame } = useSelector((state: RootState) => state.editor);
  const { frameId, frameTitle } = frame;

  let frameComponent;
  switch (frameId) {
    case FramesID.GLASS_FRAME:
      frameComponent = <GlassFrame>{children}</GlassFrame>;
      break;
    case FramesID.MAC_FRAME:
      frameComponent = (
        <MacWindowFrame title={frameTitle}>{children}</MacWindowFrame>
      );
      break;
    case FramesID.WINDOWS_FRAME:
      frameComponent = (
        <Windows10WindowFrame title={frameTitle}>
          {children}
        </Windows10WindowFrame>
      );
      break;
    case FramesID.DARK_GLASS_FRAME:
      frameComponent = <DarkBasicFrame>{children}</DarkBasicFrame>;
      break;

    case FramesID.FANCY_FRAME:
      frameComponent = <FancyFrame title={frameTitle}>{children}</FancyFrame>;
      break;
    case FramesID.DARK_MAC_FRAME:
      frameComponent = (
        <DarkMacWindowFrame title={frameTitle}>{children}</DarkMacWindowFrame>
      );
      break;
    case FramesID.DARK_WINDOWS_FRAME:
      frameComponent = (
        <DarkWindows10WindowFrame title={frameTitle}>
          {children}
        </DarkWindows10WindowFrame>
      );
      break;
    default:
      frameComponent = <>{children}</>;
      break;
  }

  return frameComponent;
};

export default FrameWrapper;

import React, { useState } from "react";
import { useCodeCanvas } from "@/hooks/useCodeEditor";
import CodeBlock from "../codeblocks/codeblock";
import { Resizable } from "re-resizable";

interface CodeCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const CodeCanvas: React.FC<CodeCanvasProps> = ({ containerRef }) => {
  const { nodeStyle, scaleStyle, padding, watermark } = useCodeCanvas();
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);
  return (
    // @ts-ignore
    <div style={scaleStyle}>
      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
        //@ts-ignore
        size={{ width }}
        onResize={(e, dir, ref: any) => setWidth(ref.offsetWidth)}
        onResizeStart={() => setShowWidth(true)}
        onResizeStop={() => setShowWidth(false)}
      >
        <div
          className="my-node flex flex-col"
          style={nodeStyle}
          ref={containerRef}
        >
          <CodeBlock />
          {watermark && (
            <div className="flex mt-4 items-center justify-center  gap-1 text-white text-opacity-70 text-sm  rounded-md bg-clip-padding">
              <div className="flex items-center gap-1 justify-center">
                <p className="text-sm">Built with </p>{" "}
                <p className="text-sm font-semibold">Moiful.com</p>
              </div>
            </div>
          )}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCanvas;

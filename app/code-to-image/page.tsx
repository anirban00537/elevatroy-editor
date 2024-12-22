"use client";

import CodeCanvas from "@/components/canvas/codeCanvas";
import FloatingContainerForCodeEditor from "@/components/floating/floatingContainerForCodeEditor";
import EditorNavbar from "@/components/navbar/editorNav";
import { useCodeCanvas, useExport } from "@/hooks/useCodeEditor";
import React, { useState } from "react";

const Page = () => {
  const { handleExport, containerRef, handleCopyImageToClipboard } =
    useExport();

  return (
    <div className="bg-slate-950 h-full w-full overflow-hidden">
      {/* Fixed Editor Navbar */}
      <div className="fixed top-0 right-0 w-full z-50">
        <EditorNavbar
          handleExport={handleExport}
          handleCopyImageToClipboard={handleCopyImageToClipboard}
          showCanvasSize={false}
        />
      </div>

      {/* Main Content */}
      <div className="flex w-full h-full md:w-full md:h-auto min-h-screen flex-col md:flex-row items-center justify-center">
        {/* Code Canvas Section */}
        <div className="flex items-center  md:min-h-screen max-h-screen justify-center md:flex-grow-0 md:flex-basis-2/3 md:mx-5 flex-col md:justify-center md:mr-[380px]">
          <div className="max-h-[600px] md:max-h-screen overflow-auto w-full">
            <CodeCanvas containerRef={containerRef} />
          </div>
        </div>

        {/* Floating Container for Code Editor */}
        <div className="w-full md:w-auto md:flex flex-col items-center justify-center md:items-start md:justify-start md:flex-grow-0 md:flex-basis-1/3 md:mt-5 md:fixed md:top-0 md:right-0 md:h-screen z-30">
          <FloatingContainerForCodeEditor handleExport={handleExport} />
        </div>
      </div>
    </div>
  );
};

export default Page;

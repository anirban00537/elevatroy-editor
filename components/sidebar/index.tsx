import React, { useEffect, useState } from "react";
import ControlSection from "./controlSection";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import { setActiveTab } from "@/store/slice/editor.slice";
import TextSection from "./textSection";

interface SidebarProps {
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: (width: number, height: number) => void;
  width: number;
  height: number;
  image: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleFileInputChange,
  handleExport,
  image,
}: SidebarProps) => {
  const { TextEditingProperty, activeTab } = useSelector(
    (state: RootState) => state.editor
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (TextEditingProperty) {
      dispatch(setActiveTab("text"));
    }
  }, [TextEditingProperty]);

  return (
    <aside className="flex flex-col md:px-4 border border-t-0 border-b-0 border-slate-800 md:flex-row h-screen w-full md:w-[380px] bg-[#191922] no-scrollbar">
      <div className="lg:flex-grow py-6 overflow-y-auto">
        <div>
          {activeTab === "image" && (
            <ControlSection
              handleFileInputChange={handleFileInputChange}
              image={image}
              handleExport={handleExport}
            />
          )}
          {(activeTab === "text" || activeTab === "draggableText") && (
            <TextSection />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

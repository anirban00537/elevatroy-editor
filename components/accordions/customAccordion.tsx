import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const CustomAccordion = ({ title, isOpen, onToggle, children }: any) => {
  return (
    <div className="w-full mt-4 border border-slate-800 rounded">
      <div
        className="flex items-center justify-between p-3 text-white rounded-md overflow-hidden whitespace-nowrap cursor-pointer"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
      {isOpen && (
        <div className="px-3 text-white py-2 rounded-md">{children}</div>
      )}
    </div>
  );
};

export default CustomAccordion;

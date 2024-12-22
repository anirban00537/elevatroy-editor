import { cn } from "@/lib/utils";
import React from "react";

interface TabProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function CustomTabs({ tabs, activeTab, onChange, className }: TabProps) {
  return (
    <div className={cn(
      "grid grid-cols-4 gap-2 mt-5 text-zinc-200", 
      className
    )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "p-2 rounded-md text-xs flex items-center justify-center cursor-pointer transition-all",
            activeTab === tab.id
              ? "bg-dark-300 text-zinc-200"
              : "text-zinc-600 hover:bg-dark-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 
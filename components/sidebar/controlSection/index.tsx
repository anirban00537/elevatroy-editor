import React from "react";
import { MoveDown, MoveLeft, MoveRight, MoveUp, Monitor, Layout, Box, Compass, Cloud, BoxSelect } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ControlSectionProps {
  threeD: any;
  handleRotateX: (value: number) => void;
  handleRotateY: (value: number) => void;
  translateX: number;
  translateY: number;
  handleTranslateX: (value: number) => void;
  handleTranslateY: (value: number) => void;
}

const positionGrid = [
  { translateX: -75, translateY: -75 },  // Far Top Left
  { translateX: -50, translateY: -75 },  // Top Left
  { translateX: 0, translateY: -75 },    // Top Center
  { translateX: 50, translateY: -75 },   // Top Right
  { translateX: 75, translateY: -75 },   // Far Top Right
  
  { translateX: -75, translateY: -25 },  // Mid-High Left
  { translateX: -50, translateY: -25 },  // Mid-High Left-Center
  { translateX: 0, translateY: -25 },    // Mid-High Center
  { translateX: 50, translateY: -25 },   // Mid-High Right-Center
  { translateX: 75, translateY: -25 },   // Mid-High Right
  
  { translateX: -75, translateY: 0 },    // Middle Far Left
  { translateX: -50, translateY: 0 },    // Middle Left
  { translateX: 0, translateY: 0 },      // Center
  { translateX: 50, translateY: 0 },     // Middle Right
  { translateX: 75, translateY: 0 },     // Middle Far Right
  
  { translateX: -75, translateY: 25 },   // Mid-Low Left
  { translateX: -50, translateY: 25 },   // Mid-Low Left-Center
  { translateX: 0, translateY: 25 },     // Mid-Low Center
  { translateX: 50, translateY: 25 },    // Mid-Low Right-Center
  { translateX: 75, translateY: 25 },    // Mid-Low Right
  
  { translateX: -75, translateY: 75 },   // Far Bottom Left
  { translateX: -50, translateY: 75 },   // Bottom Left
  { translateX: 0, translateY: 75 },     // Bottom Center
  { translateX: 50, translateY: 75 },    // Bottom Right
  { translateX: 75, translateY: 75 },    // Far Bottom Right
];

const combinedPresets = [
  { 
    name: "Front Display",
    icon: Monitor,
    position: { x: 0, y: 0 },
    rotation: { x: 10, y: 0 }
  },
  { 
    name: "Hero View",
    icon: Layout,
    position: { x: -25, y: -25 },
    rotation: { x: 25, y: -35 }
  },
  { 
    name: "Showcase",
    icon: Box,
    position: { x: 35, y: -15 },
    rotation: { x: 15, y: 45 }
  },
  { 
    name: "Dynamic",
    icon: Compass,
    position: { x: -40, y: 10 },
    rotation: { x: -20, y: -45 }
  },
  { 
    name: "Floating",
    icon: Cloud,
    position: { x: 0, y: -35 },
    rotation: { x: 35, y: 0 }
  },
  { 
    name: "Perspective",
    icon: BoxSelect,
    position: { x: 25, y: 25 },
    rotation: { x: -15, y: 30 }
  }
];

const ControlSection: React.FC<ControlSectionProps> = ({
  threeD,
  handleRotateX,
  handleRotateY,
  translateX,
  translateY,
  handleTranslateX,
  handleTranslateY,
}) => {
  const handleRotateLeft = () => handleRotateY(threeD.rotateY - 10);
  const handleRotateRight = () => handleRotateY(threeD.rotateY + 10);
  const handleRotateUp = () => handleRotateX(threeD.rotateX + 10);
  const handleRotateDown = () => handleRotateX(threeD.rotateX - 10);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 3D Controls */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">3D Image</h4>
        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={handleRotateLeft}
            className={cn(
              "p-2.5 rounded-md transition-all duration-200",
              "border border-zinc-700/50",
              "shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
              "bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-600",
              "hover:from-zinc-500 hover:via-zinc-400 hover:to-zinc-500",
              "hover:scale-105 active:scale-95",
              "group"
            )}
          >
            <MoveLeft size={16} className="text-zinc-300 group-hover:text-white transition-colors" />
          </button>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleRotateUp}
              className={cn(
                "p-2.5 rounded-md transition-all duration-200",
                "border border-zinc-700/50",
                "shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
                "bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-600",
                "hover:from-zinc-500 hover:via-zinc-400 hover:to-zinc-500",
                "hover:scale-105 active:scale-95",
                "group"
              )}
            >
              <MoveUp size={16} className="text-zinc-300 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={handleRotateDown}
              className={cn(
                "p-2.5 rounded-md transition-all duration-200",
                "border border-zinc-700/50",
                "shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
                "bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-600",
                "hover:from-zinc-500 hover:via-zinc-400 hover:to-zinc-500",
                "hover:scale-105 active:scale-95",
                "group"
              )}
            >
              <MoveDown size={16} className="text-zinc-300 group-hover:text-white transition-colors" />
            </button>
          </div>
          <button
            onClick={handleRotateRight}
            className={cn(
              "p-2.5 rounded-md transition-all duration-200",
              "border border-zinc-700/50",
              "shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
              "bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-600",
              "hover:from-zinc-500 hover:via-zinc-400 hover:to-zinc-500",
              "hover:scale-105 active:scale-95",
              "group"
            )}
          >
            <MoveRight size={16} className="text-zinc-300 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      {/* Position Controls */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Image Position</h4>
        <div className="grid grid-cols-5 gap-1 mb-3">
          {positionGrid.map((position, index) => (
            <button
              key={index}
              onClick={() => {
                handleTranslateX(position.translateX);
                handleTranslateY(position.translateY);
              }}
              className={cn(
                "aspect-square rounded-md transition-all duration-200",
                "border border-zinc-700/50",
                "shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]",
                translateX === position.translateX && translateY === position.translateY
                  ? "bg-gradient-to-b from-accent/90 via-accent to-accent/90 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-600 hover:from-zinc-500 hover:via-zinc-400 hover:to-zinc-500",
                "hover:scale-105 active:scale-95"
              )}
            />
          ))}
        </div>
      </div>

      {/* Combined Presets - Full Width */}
      <div className="col-span-2 mt-4">
        <h4 className="text-xs text-zinc-400 mb-3">Quick Presets</h4>
        <div className="grid grid-cols-3 gap-2">
          {combinedPresets.map((preset, index) => {
            const Icon = preset.icon;
            const isSelected = 
              threeD.rotateX === preset.rotation.x && 
              threeD.rotateY === preset.rotation.y && 
              translateX === preset.position.x && 
              translateY === preset.position.y;

            return (
              <button
                key={index}
                onClick={() => {
                  handleRotateX(preset.rotation.x);
                  handleRotateY(preset.rotation.y);
                  handleTranslateX(preset.position.x);
                  handleTranslateY(preset.position.y);
                }}
                className={cn(
                  "py-2 px-3 rounded-lg transition-all duration-200",
                  "border border-zinc-800",
                  "flex flex-col items-center gap-1.5",
                  "relative overflow-hidden group",
                  isSelected
                    ? "bg-gradient-to-b from-accent via-accent to-accent/90 border-accent/50 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    : "bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900/90 hover:from-zinc-700",
                  "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/0 after:to-white/[0.07] after:rounded-lg",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <Icon 
                  size={16} 
                  className={cn(
                    "transition-colors duration-200",
                    isSelected 
                      ? "text-black"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  )} 
                />
                <span 
                  className={cn(
                    "text-[11px] font-medium",
                    isSelected 
                      ? "text-black"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  )}
                >
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    
  );
};

export default ControlSection;

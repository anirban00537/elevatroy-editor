import React from "react";
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";
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
  { translateX: -100, translateY: -100 }, // Top Left
  { translateX: 0, translateY: -100 },    // Top Center
  { translateX: 100, translateY: -100 },  // Top Right
  { translateX: -100, translateY: 0 },    // Middle Left
  { translateX: 0, translateY: 0 },       // Center
  { translateX: 100, translateY: 0 },     // Middle Right
  { translateX: -100, translateY: 100 },  // Bottom Left
  { translateX: 0, translateY: 100 },     // Bottom Center
  { translateX: 100, translateY: 100 },   // Bottom Right
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
        <div className="flex items-center justify-center gap-2">
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
        <div className="grid grid-cols-3 gap-1.5">
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
    </div>
    
  );
};

export default ControlSection;

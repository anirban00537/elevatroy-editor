import React from "react";
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";

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
            className="p-2 bg-dark-300 hover:bg-dark-400 rounded-md 
              text-zinc-400 transition-colors"
          >
            <MoveLeft size={16} />
          </button>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleRotateUp}
              className="p-2 bg-dark-300 hover:bg-dark-400 rounded-md 
                text-zinc-400 transition-colors"
            >
              <MoveUp size={16} />
            </button>
            <button
              onClick={handleRotateDown}
              className="p-2 bg-dark-300 hover:bg-dark-400 rounded-md 
                text-zinc-400 transition-colors"
            >
              <MoveDown size={16} />
            </button>
          </div>
          <button
            onClick={handleRotateRight}
            className="p-2 bg-dark-300 hover:bg-dark-400 rounded-md 
              text-zinc-400 transition-colors"
          >
            <MoveRight size={16} />
          </button>
        </div>
      </div>

      {/* Position Controls */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Image Position</h4>
        <div className="grid grid-cols-3 gap-1">
          {positionGrid.map((position, index) => (
            <button
              key={index}
              onClick={() => {
                handleTranslateX(position.translateX);
                handleTranslateY(position.translateY);
              }}
              className={`aspect-square rounded-md transition-all ${
                translateX === position.translateX && translateY === position.translateY
                  ? "bg-accent text-white"
                  : "bg-dark-300 hover:bg-dark-400 text-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlSection;

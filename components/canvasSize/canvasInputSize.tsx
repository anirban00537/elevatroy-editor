import { RootState } from "@/store";
import { setHeight, setWidth } from "@/store/slice/editor.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Maximize2 } from "lucide-react";

const CanvasInputSize = () => {
  const dispatch = useDispatch();
  const { height, width } = useSelector((state: RootState) => state.editor);
  
  return (
    <div className="flex items-center gap-3 p-3 bg-dark-300 rounded-lg border 
      border-dark-border/10 hover:bg-dark-400 transition-colors"
    >
      <div className="flex items-center gap-2 text-zinc-400">
        <Maximize2 size={14} />
        <span className="text-xs font-medium">Size</span>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <div className="flex-1 flex items-center bg-dark-200 rounded-md 
          border border-dark-border/10 px-2 focus-within:ring-1 
          focus-within:ring-accent/50"
        >
          <input
            type="number"
            value={width}
            onChange={(e) => dispatch(setWidth(parseInt(e.target.value)))}
            className="w-full bg-transparent text-xs text-zinc-200 py-1.5 
              focus:outline-none"
            style={{ appearance: "textfield" }}
            placeholder="Width"
          />
          <span className="text-[10px] text-zinc-500">px</span>
        </div>

        <span className="text-xs text-zinc-500">×</span>

        <div className="flex-1 flex items-center bg-dark-200 rounded-md 
          border border-dark-border/10 px-2 focus-within:ring-1 
          focus-within:ring-accent/50"
        >
          <input
            type="number"
            value={height}
            onChange={(e) => dispatch(setHeight(parseInt(e.target.value)))}
            className="w-full bg-transparent text-xs text-zinc-200 py-1.5 
              focus:outline-none"
            style={{ appearance: "textfield" }}
            placeholder="Height"
          />
          <span className="text-[10px] text-zinc-500">px</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasInputSize;

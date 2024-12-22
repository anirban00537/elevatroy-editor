import { RootState } from "@/store";
import { setHeight, setWidth } from "@/store/slice/editor.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Maximize2 } from "lucide-react";

const CanvasInputSize = () => {
  const dispatch = useDispatch();
  const { height, width } = useSelector((state: RootState) => state.editor);
  
  return (
    <div className="flex items-center bg-dark-200 rounded-md p-3 border border-dark-border">
      <Maximize2 size={14} className="text-zinc-500 mr-3" />
      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-dark-300 rounded px-2 py-1">
          <input
            type="number"
            value={width}
            onChange={(e) => dispatch(setWidth(parseInt(e.target.value)))}
            className="w-16 bg-transparent text-sm text-zinc-200 focus:outline-none"
            style={{ appearance: "textfield" }}
          />
          <span className="text-xs text-zinc-500 ml-1">px</span>
        </div>
        <span className="text-zinc-500">×</span>
        <div className="flex items-center bg-dark-300 rounded px-2 py-1">
          <input
            type="number"
            value={height}
            onChange={(e) => dispatch(setHeight(parseInt(e.target.value)))}
            className="w-16 bg-transparent text-sm text-zinc-200 focus:outline-none"
            style={{ appearance: "textfield" }}
          />
          <span className="text-xs text-zinc-500 ml-1">px</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasInputSize;

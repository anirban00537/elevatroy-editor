import { RootState } from "@/store";
import { setHeight, setWidth } from "@/store/slice/editor.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CanvasInputSize = () => {
  const dispatch = useDispatch();
  const { height, width } = useSelector((state: RootState) => state.editor);
  return (
    <div className="flex  items-center  justify-start  py-[6px]  rounded-xl z-40 ">
      <div className="max-w-44 flex items-center justify-center rounded-md px-3">
        <input
          type="number"
          value={width}
          onChange={(e) => dispatch(setWidth(parseInt(e.target.value)))}
          className="bg-transparent text-[10px] w-12 border-none text-white rounded-md p-1 mr-1 focus:outline-none focus:border-primary"
          style={{ appearance: "textfield" }}
        />
        <span className="text-[10px] text-white">x</span>
        <input
          type="number"
          value={height}
          onChange={(e) => dispatch(setHeight(parseInt(e.target.value)))}
          className="bg-transparent text-[10px] w-12 border-none text-white rounded-md p-1 ml-1 focus:outline-none focus:border-primary"
          style={{ appearance: "textfield" }}
        />
        <span className="text-[10px] text-white">px</span>
      </div>
    </div>
  );
};

export default CanvasInputSize;

import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setFrameInfo } from "@/store/slice/editor.slice";
import { RootState } from "@/store";
import { CircleSlash, Minus, Square, X } from "lucide-react";

const FramePicker = () => {
  const dispatch = useDispatch();
  const { frame } = useSelector((state: RootState) => state.editor);

  const setFrameId = (id: number) => {
    dispatch(setFrameInfo({ ...frame, frameId: id }));
  };
  const setFrameTitle = (e: any) => {
    dispatch(setFrameInfo({ ...frame, frameTitle: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="overflow-y-auto inline-block no-scrollbar text-left w-full my-3 pb-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="text-sm font-medium mb-2 text-white mt-5"
      >
        Frames
      </motion.h1>
      <div className="pb-7 px-1">
        <input
          type="text"
          className="h-10 py-2 w-full px-2  rounded-lg bg-transparent border-[1px] text-xs border-gray-800 text-white"
          placeholder="Add Frame Title"
          value={frame.frameTitle}
          onChange={setFrameTitle}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="grid grid-cols-3 lg:grid-cols-2  gap-3 text-white"
      >
        <div onClick={() => setFrameId(0)} className="cursor-pointer">
          <div className="flex justify-center items-center  rounded-lg w-full h-16">
            <CircleSlash className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-xs text-center mt-2">None</h1>
        </div>
        <div onClick={() => setFrameId(1)} className="cursor-pointer">
          <div className=" border-[5px]  p-[30px] shadow-md border-[#ffffffc7] rounded-lg  pointer-events-none"></div>
          <h1 className="text-xs">Glass Frame</h1>
        </div>
        <div onClick={() => setFrameId(2)} className="cursor-pointer">
          <div className="border-4  p-[30px] shadow-md border-gray-600 rounded-lg bg-gray-800 pointer-events-none"></div>
          <h1 className="text-xs">Glass Frame Dark</h1>
        </div>
        <div onClick={() => setFrameId(3)} className="cursor-pointer">
          <div className="relative bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-100 flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                {" "}
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              </div>

              <div className="flex items-center gap-1"></div>
            </div>
            <div className="p-[14px] m-2"></div>
          </div>
          <h1 className="text-xs">Mac Frame</h1>
        </div>
        <div onClick={() => setFrameId(4)} className="cursor-pointer">
          <div className="relative bg-gray-800 border border-gray-600 rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-700 flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              </div>

              <div className="flex items-center gap-1"></div>
            </div>
            <div className="p-[14px] m-2"></div>
          </div>
          <h1 className="text-xs">Mac Frame Dark</h1>
        </div>
        <div onClick={() => setFrameId(5)} className="cursor-pointer">
          <div className="relative bg-white border border-gray-400 rounded-lg overflow-hidden shadow-md">
            <div className="flex items-center justify-between bg-gray-300 border-b border-gray-400 px-3 py-1">
              <div className="text-gray-300 text-sm font-medium"></div>
              <div className="flex gap-1">
                <button className="bg-[#F0F0F0] hover:bg-[#DADADA] rounded-md p-1 focus:outline-none">
                  <Minus className="w-2 h-2 text-gray-700" />
                </button>
                <button className="bg-[#F0F0F0] hover:bg-[#DADADA] rounded-md p-1 focus:outline-none">
                  <Square className="w-2 h-2 text-gray-700" />
                </button>
                <button className="bg-[#F0F0F0] hover:bg-[#DADADA] rounded-md p-1 focus:outline-none">
                  <X className="w-2 h-2 text-gray-700" />
                </button>
              </div>
            </div>
            <div className="p-4"></div>
          </div>
          <h1 className="text-xs">Windows Frame</h1>
        </div>
        <div onClick={() => setFrameId(6)} className="cursor-pointer">
          <div className="relative bg-gray-800 border border-gray-600 rounded-lg overflow-hidden shadow-md">
            <div className="flex items-center justify-between bg-gray-700 border-b border-gray-600 px-3 py-1">
              <div className="text-gray-300 text-sm font-medium"></div>
              <div className="flex gap-1">
                <button className="bg-gray-600 hover:bg-gray-500 rounded-md p-1 focus:outline-none">
                  <Minus className="w-4 h-2 text-gray-300" />
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 rounded-md p-1 focus:outline-none">
                  <Square className="w-2 h-2 text-gray-300" />
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 rounded-md p-1 focus:outline-none">
                  <X className="w-2 h-2 text-gray-300" />
                </button>
              </div>
            </div>
            <div className="p-4"></div>
          </div>
          <h1 className="text-xs">Windows Frame Dark</h1>
        </div>
        <div onClick={() => setFrameId(7)} className="cursor-pointer">
          <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-600 rounded-lg overflow-hidden shadow-md">
            <div className="flex items-center justify-between bg-purple-700 border-b border-purple-800 px-3 ">
              <div className="text-white text-sm font-medium">------ </div>
              <div className="flex gap-1"></div>
            </div>
            <div className="p-4"></div>
          </div>
          <h1 className="text-xs">Fancy Frame</h1>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FramePicker;

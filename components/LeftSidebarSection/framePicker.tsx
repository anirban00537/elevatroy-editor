import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrameInfo } from "@/store/slice/editor.slice";
import { RootState } from "@/store";
import { CircleSlash, Frame, MonitorSmartphone } from "lucide-react";
import { FramesID } from "@/helpers/core-constants";

const FramePicker = () => {
  const dispatch = useDispatch();
  const { frame } = useSelector((state: RootState) => state.editor);

  const frameOptions = [
    {
      id: FramesID.NONE,
      title: "None",
      icon: <CircleSlash size={20} />,
      preview: null,
    },
    {
      id: FramesID.GLASS_FRAME,
      title: "Glass Frame",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-[5px] border-[#ffffffc7] rounded-lg w-full h-full" />
      ),
    },
    {
      id: FramesID.DARK_GLASS_FRAME,
      title: "Glass Frame Dark",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-4 border-gray-600 rounded-lg bg-gray-800 w-full h-full" />
      ),
    },
    {
      id: FramesID.MAC_FRAME,
      title: "Mac Window",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-4 border-gray-200 rounded-lg bg-white w-full h-full">
          <div className="h-4 bg-gray-100 flex items-center gap-1.5 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
        </div>
      ),
    },
    {
      id: FramesID.DARK_MAC_FRAME,
      title: "Mac Window Dark",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-4 border-gray-700 rounded-lg bg-gray-800 w-full h-full">
          <div className="h-4 bg-gray-900 flex items-center gap-1.5 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>
      ),
    },
    {
      id: FramesID.WINDOWS_FRAME,
      title: "Windows Window",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-4 border-gray-200 rounded-lg bg-white w-full h-full">
          <div className="h-4 bg-gray-100 flex items-center justify-end gap-2 px-2">
            <div className="w-2.5 h-2.5 bg-gray-400" />
            <div className="w-2.5 h-2.5 bg-gray-400" />
            <div className="w-2.5 h-2.5 bg-red-400" />
          </div>
        </div>
      ),
    },
    {
      id: FramesID.DARK_WINDOWS_FRAME,
      title: "Windows Window Dark",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-4 border-gray-700 rounded-lg bg-gray-800 w-full h-full">
          <div className="h-4 bg-gray-900 flex items-center justify-end gap-2 px-2">
            <div className="w-2.5 h-2.5 bg-gray-600" />
            <div className="w-2.5 h-2.5 bg-gray-600" />
            <div className="w-2.5 h-2.5 bg-red-500" />
          </div>
        </div>
      ),
    },
    {
      id: FramesID.FANCY_FRAME,
      title: "Fancy Frame",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-8 border-gradient-fancy rounded-lg w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Frame Title */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Frame Title</h4>
        <input
          type="text"
          value={frame.frameTitle}
          onChange={(e) =>
            dispatch(setFrameInfo({ ...frame, frameTitle: e.target.value }))
          }
          className="w-full px-3 py-2 bg-dark-300 rounded-md text-sm 
            text-zinc-200 border border-white/10 focus:outline-none 
            focus:ring-1 focus:ring-white/20"
          placeholder="Add Frame Title"
        />
      </div>

      {/* Frame Options */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Frame Style</h4>
        <div className="grid grid-cols-2 gap-3">
          {frameOptions.map((option) => (
            <button
              key={option.id}
              onClick={() =>
                dispatch(setFrameInfo({ ...frame, frameId: option.id }))
              }
              className={`group p-4 rounded-lg border transition-all ${
                frame.frameId === option.id
                  ? "border-accent bg-dark-300"
                  : "border-white/10 bg-dark-200 hover:bg-dark-300"
              }`}
            >
              <div className="aspect-video relative mb-3">
                {option.preview || (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                    {option.icon}
                  </div>
                )}
              </div>
              <span
                className={`text-xs ${
                  frame.frameId === option.id ? "text-white" : "text-zinc-400"
                }`}
              >
                {option.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Frame Settings */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Frame Settings</h4>
        <div className="space-y-2">
          <button
            className="w-full p-3 bg-dark-300 hover:bg-dark-400 rounded-md 
              text-zinc-400 text-sm transition-colors flex items-center gap-2"
          >
            <MonitorSmartphone size={16} />
            <span>Auto-detect Device Frame</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FramePicker;

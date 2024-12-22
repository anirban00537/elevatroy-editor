import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrameInfo } from "@/store/slice/editor.slice";
import { RootState } from "@/store";
import { CircleSlash, Minus, Square, X, Frame, MonitorSmartphone } from "lucide-react";

interface FrameOption {
  id: number;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
}

const FramePicker = () => {
  const dispatch = useDispatch();
  const { frame } = useSelector((state: RootState) => state.editor);

  const frameOptions: FrameOption[] = [
    {
      id: 0,
      title: "None",
      icon: <CircleSlash size={20} />,
      preview: null
    },
    {
      id: 1,
      title: "Glass Frame",
      icon: <Frame size={20} />,
      preview: <div className="border-[5px] border-[#ffffffc7] rounded-lg w-full h-full" />
    },
    {
      id: 2,
      title: "Glass Frame Dark",
      icon: <Frame size={20} />,
      preview: <div className="border-4 border-gray-600 rounded-lg bg-gray-800 w-full h-full" />
    },
    // ... other frame options
  ];

  return (
    <div className="space-y-6">
      {/* Frame Title */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Frame Title</h4>
        <input
          type="text"
          value={frame.frameTitle}
          onChange={(e) => dispatch(setFrameInfo({ ...frame, frameTitle: e.target.value }))}
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
              onClick={() => dispatch(setFrameInfo({ ...frame, frameId: option.id }))}
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
              <span className={`text-xs ${
                frame.frameId === option.id ? "text-white" : "text-zinc-400"
              }`}>
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

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
        <div className="border-[1px] border-white/20 rounded-xl w-full h-full bg-white/5 backdrop-blur-sm" />
      ),
    },
    {
      id: FramesID.DARK_GLASS_FRAME,
      title: "Glass Frame Dark",
      icon: <Frame size={20} />,
      preview: (
        <div className="border-[1px] border-black/20 rounded-xl w-full h-full bg-black/20 backdrop-blur-sm" />
      ),
    },
    {
      id: FramesID.MAC_FRAME,
      title: "Mac Window",
      icon: <Frame size={20} />,
      preview: (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-[#ffffff08] to-[#ffffff03]">
          <div className="h-6 bg-[#ffffff08] flex items-center gap-1.5 px-2 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
        </div>
      ),
    },
    {
      id: FramesID.DARK_MAC_FRAME,
      title: "Mac Window Dark",
      icon: <Frame size={20} />,
      preview: (
        <div className="border border-black/20 rounded-xl overflow-hidden bg-gradient-to-b from-[#00000040] to-[#00000020]">
          <div className="h-6 bg-[#00000040] flex items-center gap-1.5 px-2 border-b border-black/10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
        </div>
      ),
    },
    {
      id: FramesID.WINDOWS_FRAME,
      title: "Windows Window",
      icon: <Frame size={20} />,
      preview: (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-[#ffffff08] to-[#ffffff03]">
          <div className="h-6 bg-[#ffffff08] flex items-center justify-end gap-2 px-2 border-b border-white/5">
            <div className="w-3 h-3 flex items-center justify-center text-white/60">
              −
            </div>
            <div className="w-3 h-3 flex items-center justify-center text-white/60">
              □
            </div>
            <div className="w-3 h-3 flex items-center justify-center text-white/60">
              ×
            </div>
          </div>
        </div>
      ),
    },
    {
      id: FramesID.DARK_WINDOWS_FRAME,
      title: "Windows Window Dark",
      icon: <Frame size={20} />,
      preview: (
        <div className="border border-black/20 rounded-xl overflow-hidden bg-gradient-to-b from-[#00000040] to-[#00000020]">
          <div className="h-6 bg-[#00000040] flex items-center justify-end gap-2 px-2 border-b border-black/10">
            <div className="w-3 h-3 flex items-center justify-center text-white/40">
              −
            </div>
            <div className="w-3 h-3 flex items-center justify-center text-white/40">
              □
            </div>
            <div className="w-3 h-3 flex items-center justify-center text-white/40">
              ×
            </div>
          </div>
        </div>
      ),
    },
    {
      id: FramesID.FANCY_FRAME,
      title: "Fancy Frame",
      icon: <Frame size={20} />,
      preview: (
        <div className="rounded-xl w-full h-full p-[1px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm" />
        </div>
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

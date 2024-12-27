import React from "react";
import { useDispatch } from "react-redux";
import { setHeight, setWidth } from "@/store/slice/editor.slice";
import { Layout } from "lucide-react";
import { socialMediaPostSizes } from "@/helpers/core-constants";
import CanvasSizeModal from "./CanvasSizeModal";

const CanvasSize = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState(
    socialMediaPostSizes[0]
  );

  const handleCanvasSizeChange = (size: (typeof socialMediaPostSizes)[0]) => {
    dispatch(setWidth(size.width));
    dispatch(setHeight(size.height));
    setSelectedSize(size);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full p-3 bg-dark-200 
          hover:bg-dark-300 rounded-md text-zinc-400 transition-colors border border-dark-border"
      >
        <div className="flex items-center gap-2">
          <img
            src={selectedSize.icon}
            alt={selectedSize.platform}
            className="w-4 h-4"
          />
          <span className="text-sm">{selectedSize.title}</span>
        </div>
        <Layout size={14} />
      </button>

      <CanvasSizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CanvasSize;

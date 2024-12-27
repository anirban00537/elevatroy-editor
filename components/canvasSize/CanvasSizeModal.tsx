import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { setHeight, setWidth } from "@/store/slice/editor.slice";
import { socialMediaPostSizes } from "@/helpers/core-constants";
import clsx from "clsx";

interface CanvasSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CanvasSizeModal = ({ isOpen, onClose }: CanvasSizeModalProps) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = React.useState(
    socialMediaPostSizes[0]
  );

  const handleCanvasSizeChange = (size: (typeof socialMediaPostSizes)[0]) => {
    dispatch(setWidth(size.width));
    dispatch(setHeight(size.height));
    setSelectedSize(size);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-100 border-dark-border max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-zinc-200">
            Canvas Size
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(
            socialMediaPostSizes.reduce((acc, size) => {
              if (!acc[size.platform]) acc[size.platform] = [];
              acc[size.platform].push(size);
              return acc;
            }, {} as Record<string, typeof socialMediaPostSizes>)
          ).map(([platform, sizes]) => (
            <div key={platform} className="space-y-2">
              <div className="text-sm font-medium text-zinc-400">
                {platform}
              </div>
              <div className="space-y-1">
                {sizes.map((size) => (
                  <button
                    key={size.title}
                    onClick={() => handleCanvasSizeChange(size)}
                    className={clsx(
                      "flex items-center w-full p-3 rounded-lg text-sm",
                      "hover:bg-dark-300 transition-colors border border-dark-border",
                      selectedSize.title === size.title
                        ? "bg-dark-300 text-zinc-200 border-accent"
                        : "bg-dark-200 text-zinc-400"
                    )}
                  >
                    <img
                      src={size.icon}
                      alt={size.platform}
                      className="w-5 h-5 mr-3"
                    />
                    <div className="flex flex-col items-start">
                      <span>{size.title}</span>
                      <span className="text-xs text-zinc-500">
                        {size.width} × {size.height}px
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CanvasSizeModal;

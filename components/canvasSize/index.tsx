import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { setHeight, setWidth } from "@/store/slice/editor.slice";
import { RootState } from "@/store";
import { ChevronDown, Layout } from "lucide-react";
import { socialMediaPostSizes } from "@/helpers/core-constants";
import clsx from "clsx";

const CanvasSize = () => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = React.useState(socialMediaPostSizes[0]);

  const handleCanvasSizeChange = (size: typeof socialMediaPostSizes[0]) => {
    dispatch(setWidth(size.width));
    dispatch(setHeight(size.height));
    setSelectedSize(size);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 bg-dark-200 
          hover:bg-dark-300 rounded-md text-zinc-400 transition-colors border border-dark-border">
          <div className="flex items-center gap-2">
            <img
              src={selectedSize.icon}
              alt={selectedSize.platform}
              className="w-4 h-4"
            />
            <span className="text-sm">{selectedSize.title}</span>
          </div>
          <ChevronDown size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2 bg-dark-100 border border-dark-border">
        <div className="grid gap-2">
          {Object.entries(
            socialMediaPostSizes.reduce((acc, size) => {
              if (!acc[size.platform]) acc[size.platform] = [];
              acc[size.platform].push(size);
              return acc;
            }, {} as Record<string, typeof socialMediaPostSizes>)
          ).map(([platform, sizes]) => (
            <div key={platform} className="space-y-1">
              <div className="text-xs font-medium text-zinc-500 px-2">{platform}</div>
              {sizes.map((size) => (
                <button
                  key={size.title}
                  onClick={() => handleCanvasSizeChange(size)}
                  className={clsx(
                    "flex items-center w-full p-2 rounded-md text-sm",
                    "hover:bg-dark-300 transition-colors",
                    selectedSize.title === size.title
                      ? "bg-dark-300 text-zinc-200"
                      : "text-zinc-400"
                  )}
                >
                  <img src={size.icon} alt={size.platform} className="w-4 h-4 mr-2" />
                  <div className="flex flex-col items-start">
                    <span>{size.title}</span>
                    <span className="text-xs text-zinc-500">
                      {size.width} × {size.height}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CanvasSize;

import React, { Fragment } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import the custom popover components
import { useDispatch, useSelector } from "react-redux";
import {
  setCanvasTexts,
  setHeight,
  setScale,
  setWidth,
} from "@/store/slice/editor.slice";
import { RootState } from "@/store";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { socialMediaPostSizes } from "@/helpers/core-constants";
import clsx from "clsx";

const CanvasSize = () => {
  const { image } = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = React.useState(
    socialMediaPostSizes[0]
  );

  const handleCanvasSizeChange = (size: {
    width: number;
    height: number;
    title: string; // Change type to title
  }) => {
    const selectedSize = socialMediaPostSizes.find(
      (s) => s.title === size.title
    );

    if (selectedSize) {
      dispatch(setWidth(selectedSize.width));
      dispatch(setHeight(selectedSize.height));
      setSelectedSize(selectedSize);
    }
  };

  return (
    <div className="relative  rounded-xl border-gray-800 w-full z-50">
      <Popover>
        <PopoverTrigger>
          <button className="flex items-center justify-start py-2 px-4 w-full z-40 backdrop-blur-md bg-transparent bg-opacity-80 text-white">
            <img
              src={selectedSize.icon}
              alt={`${selectedSize.title} Icon`}
              className="w-3 h-3 ml-2"
            />
            <h1 className="text-xs ml-2 hidden md:block">
              {selectedSize.title} ({selectedSize.width} x {selectedSize.height}
              )
            </h1>
            <ChevronDownIcon className="w-3 h-3 ml-2" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-deep-slate-900 w-[400px] md:w-[500px] bg-opacity-80 backdrop-blur-lg border border-gray-800 rounded-md">
          <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
              {socialMediaPostSizes.map((size) => (
                <button
                  key={size.title} // Change key to title
                  onClick={() => handleCanvasSizeChange(size)}
                  className={clsx(
                    "flex flex-col items-center justify-center py-2 px-2 text-[10px] text-gray-300 cursor-pointer hover:border-slate-800 focus:outline-none border border-slate-700 rounded-md backdrop-blur-md bg-slate-800 bg-opacity-20",
                    {
                      "font-bold": selectedSize.title === size.title,
                    }
                  )}
                >
                  <div className="flex items-center justify-start">
                    <img
                      src={size.icon}
                      alt={`${size.title} Icon`}
                      className="w-3 h-3 mr-1"
                    />
                    <span>{size.title}</span>
                  </div>
                  <span className="">
                    ({size.width} x {size.height})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CanvasSize;

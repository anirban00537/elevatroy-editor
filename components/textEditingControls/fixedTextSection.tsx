import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescriptionProperties,
  setStatus,
  setTitleProperties,
  setFixedTextDirection,
  setImageScale,
  setContentScale,
} from "@/store/slice/editor.slice";
import { Popover, Transition } from "@headlessui/react";
import { RootState } from "@/store";
import CustomSlider from "../slider/customSlider";
import { HexColorPicker } from "react-colorful";
import SelectDropdown from "../dropdown/selectDropdown";
import {
  fontFamilyOptions,
  fontStyles,
  fontWeights,
  textDecorations,
} from "@/helpers/core-constants";
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";
import { Switch } from "../ui/switch";

const FixedTextSection = () => {
  const dispatch = useDispatch();
  const { fixedTextProperties } = useSelector(
    (state: RootState) => state.editor
  );
  const { titleProperties, descriptionProperties, status } =
    fixedTextProperties;

  // Function to handle changes in title properties
  const handleTitleChange = (key: string, value: string) => {
    dispatch(setTitleProperties({ ...titleProperties, [key]: value }));
  };

  // Function to handle changes in description properties
  const handleDescriptionChange = (key: string, value: string) => {
    dispatch(
      setDescriptionProperties({ ...descriptionProperties, [key]: value })
    );
  };

  // Function to handle status change
  const handleStatusChange = () => {
    dispatch(setStatus(!status));
  };

  return (
    <div className="overflow-y-auto h-full px-1 pb-12">
      <div className="mb-2">
        <h2 className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-4">
          Enable/Disable Text
        </h2>

        <Switch
          checked={status}
          onCheckedChange={() => {
            dispatch(setStatus(!status));
            status
              ? dispatch(setContentScale(0.8))
              : dispatch(setContentScale(0.5));
          }}
        />
      </div>
      {status && (
        <div>
          <div>
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-xs text-white text-start w-full ">
                Text Direction
              </h1>
            </div>
            <div className="flex">
              {/* <button
                className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
                onClick={() => {
                  dispatch(setFixedTextDirection("row"));
                }}
              >
                <MoveLeft size={8} />
              </button> */}
              <button
                className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
                onClick={() => {
                  dispatch(setFixedTextDirection("column"));
                }}
              >
                <MoveUp size={8} />
              </button>

              <button
                className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
                onClick={() => {
                  dispatch(setFixedTextDirection("column-reverse"));
                }}
              >
                <MoveDown size={8} />
              </button>
              {/* <button
                className="bg-white border-none rounded-md p-3 m-1 cursor-pointer flex justify-center items-center "
                onClick={() => {
                  dispatch(setFixedTextDirection("row-reverse"));
                }}
              >
                <MoveRight size={8} />
              </button> */}
            </div>
          </div>
          <div className="mb-2 mt-4">
            <h2 className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-4">
              {" "}
              Title Properties
            </h2>

            <input
              type="text"
              value={titleProperties.value}
              onChange={(e) => handleTitleChange("value", e.target.value)}
              className="bg-transparent text-white border border-slate-800 focus:outline-none focus:border-white-500 rounded-md px-3 py-2 w-full"
            />
          </div>
          <CustomSlider
            label={"Title Font Size"}
            value={titleProperties.fontSize}
            min={2}
            max={200} // Adjusted maximum font size
            step={1}
            onChange={(value) => {
              dispatch(
                setTitleProperties({ ...titleProperties, fontSize: value })
              );
            }}
          />
          <div className="mb-2">
            <h2 className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-4">
              {" "}
              Color
            </h2>
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                    style={{ backgroundColor: titleProperties.color }}
                  ></Popover.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel>
                      <div className="absolute top-12 left-0">
                        {/* Color Picker */}
                        <HexColorPicker
                          color={titleProperties.color}
                          onChange={(color) => {
                            dispatch(
                              setTitleProperties({
                                ...titleProperties,
                                color: color,
                              })
                            );
                          }}
                        />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>

          <div className="mb-2">
            <h2 className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-4">
              {" "}
              Description Properties
            </h2>
            <textarea
              value={descriptionProperties.value}
              onChange={(e) => handleDescriptionChange("value", e.target.value)}
              className="bg-transparent text-white border border-slate-800 focus:outline-none focus:border-white-500 rounded-md px-3 py-2 w-full"
              rows={10}
            />
            {/* Add more input fields for Description Properties */}
          </div>
          {/* Custom Slider for Description Font Size */}
          <CustomSlider
            label={"Description Font Size"}
            value={descriptionProperties.fontSize}
            min={2}
            max={150} // Adjusted maximum font size
            step={1}
            onChange={(value) => {
              dispatch(
                setDescriptionProperties({
                  ...descriptionProperties,
                  fontSize: value,
                })
              );
            }}
          />
          {/* Description Color */}
          <div className="mb-2">
            <h2 className="text-xs flex items-center  font-medium  text-gray-300 w-full mb-4">
              {" "}
              Color
            </h2>
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                    style={{ backgroundColor: descriptionProperties.color }}
                  ></Popover.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel>
                      <div className="absolute top-12 left-0">
                        {/* Color Picker */}
                        <HexColorPicker
                          color={descriptionProperties.color}
                          onChange={(color) => {
                            dispatch(
                              setDescriptionProperties({
                                ...descriptionProperties,
                                color: color,
                              })
                            );
                          }}
                        />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedTextSection;

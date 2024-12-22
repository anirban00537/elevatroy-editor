import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomSlider from "@/components/slider/customSlider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Popover, Transition } from "@headlessui/react";

import {
  removeCanvasTextById,
  removeTextById,
  setTextEditing,
  updateFontSizeById,
  updateFontWeightById,
  updateTextById,
  updateFontStyleById,
  updateTextDecorationById,
  updateFontFamilyById,
  removeTextEditingProperty,
  updateColorById,
} from "@/store/slice/editor.slice";
import SelectDropdown from "../dropdown/selectDropdown";
import CustomAccordion from "../accordions/customAccordion";
import { HexColorPicker } from "react-colorful";
import {
  fontFamilyOptions,
  fontStyles,
  fontWeights,
  textDecorations,
} from "@/helpers/core-constants";

const TextProperty = ({ text, index }: any) => {
  const { TextEditingProperty } = useSelector(
    (state: RootState) => state.editor
  );
  const [textProperty, setTextProperty] = useState(text);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTextProperty(text);
  }, [text]);

  const dispatch = useDispatch();

  const handleRemoveCanvasText = (id: string) => {
    dispatch(removeCanvasTextById(id));
  };

  useEffect(() => {
    if (TextEditingProperty?.id === textProperty?.id) {
      setIsOpen(true);
    }
  }, [TextEditingProperty]);

  const TextEditingToggle = () => {
    setIsOpen(!isOpen);
    !textProperty
      ? dispatch(setTextEditing(textProperty))
      : dispatch(removeTextEditingProperty());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
    >
      <CustomAccordion
        title={`${index + 1}. ${text.text.slice(0, 20)}`}
        isOpen={isOpen}
        onToggle={TextEditingToggle}
      >
        <CustomSlider
          label={"Font Size"}
          value={text.fontSize}
          min={2}
          max={150}
          step={1}
          onChange={(value) => {
            dispatch(
              updateFontSizeById({
                id: textProperty.id,
                fontSize: value,
              })
            );
            setTextProperty({ ...text, fontSize: value });
          }}
        />
        <div className="relative z-30 inline-block text-left w-full my-3">
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  className="relative w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                  style={{ backgroundColor: textProperty.color }}
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
                      <HexColorPicker
                        color={textProperty.color}
                        onChange={(color) => {
                          dispatch(
                            updateColorById({
                              id: textProperty.id,
                              color: color,
                            })
                          );
                          setTextProperty({ ...textProperty, color: color });
                        }}
                      />
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex flex-col">
            <h1 className="text-xs flex items-center font-medium text-gray-300 mt-2">
              Font Weight
            </h1>
            <div className="border border-slate-800 rounded-md p-2 mt-2">
              <SelectDropdown
                options={fontWeights.map((weight) => ({
                  label: weight,
                  value: weight,
                }))}
                onSelect={(value) => {
                  dispatch(
                    updateFontWeightById({
                      id: textProperty.id,
                      fontWeight: value,
                    })
                  );
                  setTextProperty({ ...textProperty, fontWeight: value });
                }}
                disabled={!textProperty.fontWeight}
                selectedValue={textProperty.fontWeight}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs flex items-center font-medium text-gray-300 mt-2">
              Font Style
            </h1>
            <div className="border border-slate-800 rounded-md p-2 mt-2">
              <SelectDropdown
                options={fontStyles.map((style) => ({
                  label: style,
                  value: style,
                }))}
                onSelect={(value) => {
                  dispatch(
                    updateFontStyleById({
                      id: textProperty.id,
                      fontStyle: value,
                    })
                  );
                  setTextProperty({ ...textProperty, fontStyle: value });
                }}
                selectedValue={textProperty.fontStyle}
                disabled={!textProperty.fontStyle}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs flex items-center font-medium text-gray-300 mt-2">
              Text Decoration
            </h1>
            <div className="border border-slate-800 rounded-md p-2 mt-2">
              <SelectDropdown
                options={textDecorations.map((decoration) => ({
                  label: decoration,
                  value: decoration,
                }))}
                onSelect={(value) => {
                  dispatch(
                    updateTextDecorationById({
                      id: textProperty.id,
                      textDecoration: value,
                    })
                  );
                  setTextProperty({ ...textProperty, textDecoration: value });
                }}
                selectedValue={textProperty.textDecoration}
                disabled={!textProperty.textDecoration}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs flex items-center font-medium text-gray-300 mt-2">
              Font Family
            </h1>
            <div className="border border-slate-800 rounded-md p-2 mt-2">
              <SelectDropdown
                options={fontFamilyOptions.map((family) => ({
                  label: family,
                  value: family,
                }))}
                onSelect={(value) => {
                  dispatch(
                    updateFontFamilyById({
                      id: textProperty.id,
                      fontFamily: value,
                    })
                  );
                  setTextProperty({ ...textProperty, fontFamily: value });
                }}
                disabled={!textProperty.fontFamily}
                selectedValue={textProperty.fontFamily}
              />
            </div>
          </div>
        </div>

        <button
          className="bg-white w-full text-red-500 text-[10px] p-2 rounded-md mt-5"
          onClick={() => handleRemoveCanvasText(textProperty.id)}
        >
          Remove Text
        </button>
      </CustomAccordion>
    </motion.div>
  );
};

export default TextProperty;

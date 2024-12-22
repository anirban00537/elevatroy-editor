import React, { FC } from "react";
import { clsx } from "clsx";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";

interface Option {
  label: string;
  value: any;
  id?: string | number;
}

interface SelectDropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  disabled: boolean;
  selectedValue: string;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  options,
  onSelect,
  disabled,
  selectedValue,
}) => {
  return (
    <SelectPrimitive.Root
      defaultValue={options[0].value}
      disabled={disabled}
      onValueChange={(value) => onSelect(value)}
    >
      <SelectPrimitive.Trigger asChild aria-label="Dropdown Trigger">
        <button className="inline-flex select-none items-center justify-center rounded-md px-4 text-[10px] font-medium bg-transparent text-white hover:bg-slate-950 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 group radix-state-open:bg-gray-50 radix-state-open:bg-gray-950 radix-state-on:bg-gray-50 radix-state-on:bg-gray-950 radix-state-instant-open:bg-gray-50 z-50 radix-state-delayed-open:bg-gray-50">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content className="text-white bg-slate-950 border border-slate-800 p-2 rounded-lg shadow-lg z-50">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-300 z-50">
          <ChevronUpIcon size={7} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>
          <SelectPrimitive.Group>
            {options.map((option, index) => (
              <SelectPrimitive.Item
                key={index}
                value={option.value}
                className={clsx(
                  "relative flex items-center px-8 py-2 z-50 rounded-md  text-gray-300 font-medium focus:bg-gray-800",
                  "radix-disabled:opacity-50",
                  "focus:outline-none select-none",
                  {
                    "bg-gray-950": selectedValue === option.value,
                  }
                )}
              >
                <SelectPrimitive.ItemText>
                  <span className="text-[10px]">{option.label}</span>
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  {selectedValue === option.value && <CheckIcon />}
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-300">
          <ChevronDownIcon size={7} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default SelectDropdown;

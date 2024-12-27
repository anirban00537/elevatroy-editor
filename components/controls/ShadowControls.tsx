import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setImageShadow, setShadowSettings } from "@/store/slice/editor.slice";
import CustomSlider from "../slider/customSlider";
import { Switch } from "../ui/switch";
import { HexColorPicker } from "react-colorful";

const ShadowControls = () => {
  const dispatch = useDispatch();
  const shadowSettings = useSelector(
    (state: RootState) => state.editor.shadowSettings
  );
  const imageShadow = useSelector(
    (state: RootState) => state.editor.imageShadow
  );

  const handleShadowChange = (value: number) => {
    dispatch(setImageShadow(value));
  };

  const updateShadow = (key: string, value: number | string | boolean) => {
    dispatch(setShadowSettings({ [key]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Main Shadow Control */}
      <CustomSlider
        label="Shadow"
        value={imageShadow}
        onChange={handleShadowChange}
        min={0}
        max={12}
        step={1}
      />

      {/* Advanced Shadow Controls */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-400">Advanced Shadow</span>
        <Switch
          checked={shadowSettings.enabled}
          onCheckedChange={(checked) => updateShadow("enabled", checked)}
        />
      </div>

      {shadowSettings.enabled && (
        <>
          <CustomSlider
            label="Offset X"
            value={shadowSettings.offsetX}
            onChange={(value) => updateShadow("offsetX", value)}
            min={-50}
            max={50}
            step={1}
          />

          <CustomSlider
            label="Offset Y"
            value={shadowSettings.offsetY}
            onChange={(value) => updateShadow("offsetY", value)}
            min={-50}
            max={50}
            step={1}
          />

          <CustomSlider
            label="Blur"
            value={shadowSettings.blur}
            onChange={(value) => updateShadow("blur", value)}
            min={0}
            max={100}
            step={1}
          />

          <CustomSlider
            label="Spread"
            value={shadowSettings.spread}
            onChange={(value) => updateShadow("spread", value)}
            min={-50}
            max={50}
            step={1}
          />

          <CustomSlider
            label="Opacity"
            value={shadowSettings.opacity}
            onChange={(value) => updateShadow("opacity", value)}
            min={0}
            max={1}
            step={0.01}
          />

          <div className="space-y-2">
            <span className="text-xs text-zinc-400">Shadow Color</span>
            <HexColorPicker
              color={shadowSettings.color}
              onChange={(color) => updateShadow("color", color)}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Inset Shadow</span>
            <Switch
              checked={shadowSettings.inset}
              onCheckedChange={(checked) => updateShadow("inset", checked)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShadowControls;

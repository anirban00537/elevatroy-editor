import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setImageRadius,
  setCanvasRadius,
  setImageScale,
  setContentScale,
} from "@/store/slice/editor.slice";
import CustomSlider from "../slider/customSlider";

const AdjustmentControls = () => {
  const dispatch = useDispatch();
  const imageRadius = useSelector(
    (state: RootState) => state.editor.imageRadius
  );
  const canvasRadius = useSelector(
    (state: RootState) => state.editor.canvasRadius
  );
  const imageScale = useSelector((state: RootState) => state.editor.imageScale);
  const contentScale = useSelector(
    (state: RootState) => state.editor.contentScale
  );

  return (
    <div className="space-y-4">
      <CustomSlider
        label="Image Radius"
        value={imageRadius}
        onChange={(value) => dispatch(setImageRadius(value))}
        min={0}
        max={100}
        step={1}
      />
      <CustomSlider
        label="Canvas Radius"
        value={canvasRadius}
        onChange={(value) => dispatch(setCanvasRadius(value))}
        min={0}
        max={100}
        step={1}
      />
      <CustomSlider
        label="Image Size"
        value={imageScale}
        onChange={(value) => dispatch(setImageScale(value))}
        min={0.1}
        max={2}
        step={0.1}
      />
      <CustomSlider
        label="Content Size"
        value={contentScale}
        onChange={(value) => dispatch(setContentScale(value))}
        min={0.1}
        max={2}
        step={0.1}
      />
    </div>
  );
};

export default AdjustmentControls;

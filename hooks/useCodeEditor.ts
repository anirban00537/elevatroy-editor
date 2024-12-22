import { useEffect, useState } from "react";
import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import {
  backgroundToggle,
  setColors,
  setDarkMode,
  setFontSize,
  setFontStyle,
  setGradientDirection,
  setLanguage,
  setPadding,
  setRotateX,
  setRotateY,
  setScale,
  setWatermark,
} from "@/store/slice/codeEditor.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import toast from "react-hot-toast";

export const useExport = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file: any = items[i].getAsFile();

          try {
            //@ts-ignore
            await handleImageUploadDrop([file]);
          } catch (error) {
            // Upload failed
            console.error("Upload failed:", error);
          }

          break;
        }
      }
    }
  };

  const handleExport = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const { clientWidth, clientHeight } = containerRef.current;

    toPng(containerRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Moiful-${new Date().getTime()}.png`;
        link.href = dataUrl;

        // Set image dimensions for high-quality export
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = clientWidth;
          canvas.height = clientHeight;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(image, 0, 0, clientWidth, clientHeight);
            const newUrl = canvas.toDataURL("image/png");
            link.href = newUrl;
            link.click();
          }
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }, [containerRef]);

  const handleCopyImageToClipboard = useCallback(
    (width: number, height: number) => {
      if (containerRef.current === null) {
        return;
      }

      toPng(containerRef.current, { cacheBust: true })
        .then((dataUrl: any) => {
          // Convert data URL to blob
          return fetch(dataUrl)
            .then((response) => response.blob())
            .then((blob) => {
              // Copy blob to clipboard
              return navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob }),
              ]);
            });
        })
        .then(() => {
          console.log("Image copied to clipboard!");
          toast("Image copied to clipboard!", {
            icon: "🎉",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        })
        .catch((error) => {
          console.error("Failed to copy image to clipboard:", error);
          toast.error("Failed to copy image to clipboard");
        });
    },
    [containerRef]
  );

  return {
    handleExport,
    handleCopyImageToClipboard,
    containerRef,
    handlePaste,
  };
};

export const useColors = () => {
  const colors = useSelector((state: RootState) => state.code.colors);
  const dispatch = useDispatch();

  const setGradientColors = (colorArray: any) => {
    dispatch(
      setColors({
        ...colors,
        gradientColors: colorArray,
      })
    );
  };

  const handleRemoveColor = (id: number) => {
    dispatch(
      setColors({
        ...colors,
        gradientColors: colors.gradientColors.filter(
          (color: any) => color.id !== id
        ),
      })
    );
  };

  const addGradientToColorPallet = (colorArray: any) => {
    dispatch(
      setColors({
        ...colors,
        gradientColors: colorArray,
      })
    );
  };

  const handleAddColor = () => {
    dispatch(
      setColors({
        ...colors,
        gradientColors: [
          ...colors.gradientColors,
          { id: colors.gradientColors.length + 1, color: "#ffffff" },
        ],
      })
    );
  };

  const handleColorPickerChange = (newColor: string, id: number) => {
    dispatch(
      setColors({
        ...colors,
        gradientColors: colors.gradientColors.map((color: any) =>
          color.id === id ? { ...color, color: newColor } : color
        ),
      })
    );
  };

  return {
    gradientColors: colors.gradientColors,
    setGradientColors,
    handleRemoveColor,
    handleAddColor,
    handleColorPickerChange,
    addGradientToColorPallet,
  };
};
const calculateScale = (width: number, height: number) => {
  let newScale = 2;

  newScale = Math.min(newScale, 1100 / Math.max(width, 1));
  newScale = Math.min(newScale, 600 / Math.max(height, 1));

  const screenWidth = window.innerWidth - 350;
  if (screenWidth < 1487) {
    newScale *= 0.7;
  }
  if (screenWidth < 1233) {
    newScale *= 0.6;
  }
  if (screenWidth < 500) {
    newScale *= 0.65;
  }

  // Calculate the minimum scale based on window dimensions
  const minScale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);

  // Apply the minimum scale
  newScale = Math.min(newScale, minScale);

  return newScale;
};

// Function to use the Image Canvas

export const useCodeCanvas = () => {
  const {
    width,
    scale,
    background,
    padding,
    darkMode,
    theme,
    language,
    fontSize,
    watermark,
    colors,
    threeD,
  } = useSelector((state: RootState) => state.code);
  const { gradientDirection } = colors;
  const { gradientColors } = useColors();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateScale = () => {
      dispatch(setScale(calculateScale(width, 0)));
    };

    updateScale();
  }, [width]);
  useEffect(() => {
    const updateScale = () => {
      dispatch(setScale(calculateScale(width, 0)));
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [width]);

  const backgroundToggleDispatch = () => {
    dispatch(backgroundToggle(!background));
  };
  const darkmodeToggleDispatch = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const setLanguageDispatch = (language: string) => {
    dispatch(setLanguage(language));
  };

  const setPaddingDispatch = (padding: number) => {
    dispatch(setPadding(padding));
  };
  const setFontSizeDispatch = (fontSize: number) => {
    dispatch(setFontSize(fontSize));
  };
  const setWatermarkDispatch = (watermark: boolean) => {
    dispatch(setWatermark(watermark));
  };
  const handleGradientDirectionChange = (direction: string) => {
    dispatch(setGradientDirection(direction));
  };
  const handleRotateX = useCallback(
    (value: number) => {
      dispatch(setRotateX(value));
    },
    [dispatch]
  );
  const handleRotateY = useCallback(
    (value: number) => {
      dispatch(setRotateY(value));
    },
    [dispatch]
  );
  const backgroundImage = `linear-gradient(${
    colors.gradientDirection
  }, ${gradientColors.map((gradient: any) => gradient.color).join(", ")})`;

  const nodeStyle: React.CSSProperties = {
    width: `auto`,
    height: `auto`,
    padding: `${padding}px`,
    // maxWidth: "1000px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    background: background ? backgroundImage : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const scaleStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: "50% center",
    marginTop: "10px",
    willChange: "transform",
    imageRendering: "pixelated",
  };
  return {
    nodeStyle,
    scaleStyle: scaleStyle,
    backgroundToggleDispatch,
    background,
    setPaddingDispatch,
    padding,
    darkmodeToggleDispatch,
    darkMode,
    theme,
    setLanguageDispatch,
    language,
    gradientColors,
    fontSize,
    setFontSizeDispatch,
    setWatermarkDispatch,
    watermark,
    handleGradientDirectionChange,
    gradientDirection,
    threeD,
    handleRotateX,
    handleRotateY,
  };
};

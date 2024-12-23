import { useEffect, useState } from "react";
import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import {
  setCanvasRadius,
  setColors,
  setGridOverlay,
  setImageRadius,
  setImageShadow,
  setScale,
  setBackgroundType,
  setImage,
  setProspective,
  setRotateX,
  setRotateY,
  setRotateZ,
  setTranslateX,
  setTranslateY,
  setImageScale,
  setContentScale,
  setBackgroundImage,
  setActiveTab,
} from "@/store/slice/editor.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ColorPalettes, imageShadowPresets } from "@/helpers/core-constants";
import toast from "react-hot-toast";

export const useExport = () => {
  const { image } = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e);
  };
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
  const handleImageUploadDrop = (fileList: FileList) => {
    const file = fileList[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        img.onload = () => {
          dispatch(setImage(img));
        };
      };

      reader.readAsDataURL(file);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        img.onload = () => {
          dispatch(setImage(img));
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleExport = useCallback(
    (width: number, height: number) => {
      if (containerRef.current === null) {
        return;
      }

      toPng(containerRef.current, { cacheBust: true })
        .then((dataUrl: any) => {
          const link = document.createElement("a");
          link.download = `Moiful-${new Date().getTime()}.png`;
          link.href = dataUrl;

          // Set image dimensions for high quality export
          const image = new Image();
          image.src = dataUrl;
          image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            if (context) {
              context.drawImage(image, 0, 0, width, height);
              const newUrl = canvas.toDataURL("image/png");
              link.href = newUrl;
              link.click();
            }
          };
        })
        .catch((err: any) => {
          console.error(err);
        });
    },
    [containerRef]
  );
  const handleCopyImageToClipboard = useCallback(() => {
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
  }, [containerRef]);

  return {
    handleExport,
    handleCopyImageToClipboard,
    handleImageUpload,
    containerRef,
    handleFileInputChange,
    handleImageUploadDrop,
    image,
    setImage,
    handlePaste,
  };
};

export const useColors = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.editor.colors);
  const handleBackgroundImage = (imageLink: string) => {
    dispatch(setBackgroundImage(imageLink));
    dispatch(setBackgroundType("image"));
  };
  const setBackgroundColor = (color: string) => {
    dispatch(
      setColors({
        ...colors,
        backgroundColor: color,
      })
    );
    dispatch(setBackgroundType("solid"));
  };

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
    dispatch(setBackgroundType("gradient"));
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

  const setGradientColorStatus = (type: string) => {
    dispatch(setBackgroundType(type));
  };

  return {
    backgroundColor: colors.backgroundColor,
    setBackgroundColor,
    gradientColors: colors.gradientColors,
    setGradientColors,
    handleRemoveColor,
    handleAddColor,
    handleColorPickerChange,
    backgroundType: colors.backgroundType,
    setGradientColorStatus,
    addGradientToColorPallet,
    handleBackgroundImage,
  };
};
const calculateScale = (width: number, height: number) => {
  let newScale = 1;

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
export const useImageCanvas = (image: HTMLImageElement | null) => {
  const {
    height,
    width,
    scale,
    colors,
    imageRadius,
    canvasRadius,
    gridOverlay,
    imageShadow,
    canvasTexts,
    threeD,
    imageScale,
  } = useSelector((state: RootState) => state.editor);

  const { backgroundColor, gradientColors, backgroundType } = useColors();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateScale = () => {
      dispatch(setScale(calculateScale(width, height)));
    };

    updateScale();
  }, [width, height]);
  useEffect(() => {
    const updateScale = () => {
      dispatch(setScale(calculateScale(width, height)));
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [width, height]);

  const backgroundImage =
    gridOverlay && backgroundType === "gradient"
      ? `url("/cross-section.svg"), linear-gradient(${
          colors.gradientDirection
        }, ${gradientColors.map((gradient: any) => gradient.color).join(", ")})`
      : !gridOverlay && backgroundType === "gradient"
      ? `linear-gradient(${colors.gradientDirection}, ${gradientColors
          .map((gradient: any) => gradient.color)
          .join(", ")})`
      : gridOverlay && backgroundType === "solid"
      ? `url("/cross-section.svg"), ${backgroundColor}`
      : gridOverlay && backgroundType === "image"
      ? `url("/cross-section.svg"), url(${colors.backgroundImage})`
      : !gridOverlay && backgroundType === "solid"
      ? `${backgroundColor}`
      : !gridOverlay && backgroundType === "image"
      ? `url(${colors.backgroundImage})`
      : backgroundColor;

  const nodeStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    maxHeight: `${height}px`,
    maxWidth: `${width}px`,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    background: backgroundImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: `${canvasRadius}px`,
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
    imageSrc: image?.src,
    gridOverlay,
    canvasTexts,
    scaleStyle: scaleStyle,
    imageStyle: {
      // borderRadius: `${imageRadius}px`,
      cursor: "grab",
      transform: `perspective(${threeD.perspective}px) rotateX(${threeD.rotateX}deg) rotateY(${threeD.rotateY}deg) rotateZ(${threeD.rotateZ}deg) scale(${imageScale})`,
      transition: "all 0.5s ease-out 0s",
      position: "relative",
    },
  };
};
export const useCodeCanvas = () => {
  const {
    height,
    width,
    scale,
    colors,
    canvasRadius,
    gridOverlay,
    canvasTexts,
    threeD,
    imageScale,
  } = useSelector((state: RootState) => state.editor);

  const { backgroundColor, gradientColors, backgroundType } = useColors();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateScale = () => {
      dispatch(setScale(calculateScale(width, height)));
    };

    updateScale();
  }, [width, height]);

  useEffect(() => {
    const updateScale = () => {
      dispatch(setScale(calculateScale(width, height)));
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [width, height]);

  const backgroundImage =
    gridOverlay && backgroundType === "gradient"
      ? `url("/cross-section.svg"), linear-gradient(${
          colors.gradientDirection
        }, ${gradientColors.map((gradient: any) => gradient.color).join(", ")})`
      : !gridOverlay && backgroundType === "gradient"
      ? `linear-gradient(${colors.gradientDirection}, ${gradientColors
          .map((gradient: any) => gradient.color)
          .join(", ")})`
      : gridOverlay && backgroundType === "solid"
      ? `url("/cross-section.svg"), ${backgroundColor}`
      : gridOverlay && backgroundType === "image"
      ? `url("/cross-section.svg"), url(${colors.backgroundImage})`
      : !gridOverlay && backgroundType === "solid"
      ? `${backgroundColor}`
      : !gridOverlay && backgroundType === "image"
      ? `url(${colors.backgroundImage})`
      : backgroundColor;

  const nodeStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `auto`,
    minHeight: `${height}px`,
    maxWidth: `${width}px`,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    background: backgroundImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: `${canvasRadius}px`,
  };

  return {
    nodeStyle,
    imageSrc: null,
    gridOverlay,
    canvasTexts,
    scaleStyle: {
      transform: `scale(${scale})`,
      marginTop: "10px",
    },
    imageStyle: {
      // borderRadius: `${imageRadius}px`,
      cursor: "grab",
      transform: `perspective(${threeD.perspective}px) rotateX(${threeD.rotateX}deg) rotateY(${threeD.rotateY}deg) rotateZ(${threeD.rotateZ}deg) scale(${imageScale})`,
      transition: "all 0.5s ease-out 0s",
      position: "relative",
    },
  };
};

export const useImageSection = () => {
  const dispatch = useDispatch();
  const {
    imageRadius,
    canvasRadius,
    threeD,
    gridOverlay,
    imageShadow,
    translateX,
    translateY,
    imageScale,
    contentScale,
  } = useSelector((state: RootState) => state.editor);

  const handleImageRadiusChange = useCallback(
    (value: number) => {
      dispatch(setImageRadius(value));
    },
    [dispatch]
  );
  const handleProspective = useCallback(
    (value: number) => {
      dispatch(setProspective(value));
    },
    [dispatch]
  );
  const handleImageScale = useCallback(
    (value: number) => {
      dispatch(setImageScale(value));
    },
    [dispatch]
  );
  const handleContentScale = useCallback(
    (value: number) => {
      dispatch(setContentScale(value));
    },
    [dispatch]
  );
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
  const handleActiveTab = useCallback(
    (value: string) => {
      dispatch(setActiveTab(value));
    },
    [dispatch]
  );
  const handleRotateZ = useCallback(
    (value: number) => {
      dispatch(setRotateZ(value));
    },
    [dispatch]
  );
  const handleTranslateX = useCallback(
    (value: number) => {
      dispatch(setTranslateX(value));
    },
    [dispatch]
  );
  const handleTranslateY = useCallback(
    (value: number) => {
      dispatch(setTranslateY(value));
    },
    [dispatch]
  );

  const setGridOverlayState = useCallback((value: boolean) => {
    dispatch(setGridOverlay(value));
  }, [dispatch]);

  const handleCanvasRadiusChange = useCallback(
    (value: number) => {
      dispatch(setCanvasRadius(value));
    },
    [dispatch]
  );
  const handleShadowChange = useCallback(
    (value: number) => {
      dispatch(setImageShadow(value));
    },
    [dispatch]
  );

  return {
    imageRadius,
    canvasRadius,
    handleImageRadiusChange,
    handleCanvasRadiusChange,
    setGridOverlayState,
    gridOverlay,
    handleShadowChange,
    imageShadow,
    threeD,
    handleProspective,
    handleRotateX,
    handleRotateY,
    handleRotateZ,
    translateX,
    translateY,
    handleTranslateX,
    handleTranslateY,
    handleImageScale,
    imageScale,
    handleContentScale,
    contentScale,
    handleActiveTab,
  };
};

export const useRandomColorFromPallet = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state: RootState) => state.editor);
  useEffect(() => {
    const length = ColorPalettes.length;
    const randomIndex = Math.floor(Math.random() * length);
    const randomPalette = ColorPalettes[randomIndex];
    console.log(randomPalette, "randomPalette");
    dispatch(
      setColors({
        ...colors,
        gradientColors: randomPalette,
      })
    );
  }, []);
};

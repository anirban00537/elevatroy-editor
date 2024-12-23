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
  // Get viewport dimensions with padding
  const viewportWidth = window.innerWidth - 380; // 320px sidebar + 60px padding
  const viewportHeight = window.innerHeight - 100; // 100px padding

  // Calculate scale ratios for both dimensions
  const scaleX = viewportWidth / width;
  const scaleY = viewportHeight / height;

  // Use the smaller scale to ensure image fits both dimensions
  let scale = Math.min(scaleX, scaleY);

  // Add breakpoints for different screen sizes
  if (viewportWidth < 1600) scale *= 0.9;  // Large screens
  if (viewportWidth < 1200) scale *= 0.85; // Medium screens
  if (viewportWidth < 900) scale *= 0.8;   // Small screens

  // Ensure minimum and maximum scale
  scale = Math.max(0.1, Math.min(scale, 1.5));

  return scale;
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
    shadowSettings,
  } = useSelector((state: RootState) => state.editor);

  const { backgroundColor, gradientColors, backgroundType } = useColors();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateScale = () => {
      const newScale = calculateScale(width, height);
      dispatch(setScale(newScale));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [width, height, dispatch]);

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

  const generateImageShadow = () => {
    const shadows = [];

    if (shadowSettings.enabled) {
      const { offsetX, offsetY, blur, spread, color, opacity, inset } = shadowSettings;
      const rgba = `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, ${opacity})`;
      
      // For image, we use filter: drop-shadow instead of box-shadow for better results
      shadows.push(`drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${rgba})`);
    }

    // Add depth and ambient shadows
    shadows.push(`drop-shadow(0 ${imageShadow}px ${imageShadow * 2}px rgba(0, 0, 0, 0.15))`);
    shadows.push(`drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))`);
    
    return shadows.join(' ');
  };

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
    border: '1px solid rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: 'none', // Remove container shadow
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const scaleStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: "50% center",
    marginTop: "10px",
    willChange: "transform, filter",
    imageRendering: "auto",
  };

  const imageStyle: React.CSSProperties = {
    cursor: "grab",
    transform: `
      perspective(${threeD.perspective}px) 
      rotateX(${threeD.rotateX}deg) 
      rotateY(${threeD.rotateY}deg) 
      rotateZ(${threeD.rotateZ}deg) 
      scale(${imageScale})
    `,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    filter: `${generateImageShadow()} contrast(1.03) saturate(1.05) brightness(1.02)`,
    WebkitFontSmoothing: 'antialiased',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
  };

  return {
    nodeStyle,
    imageSrc: image?.src,
    scaleStyle,
    imageStyle,
    canvasTexts,
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

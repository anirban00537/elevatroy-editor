import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

export type TextProperties = {
  value: string;
  fontSize: number;
  color: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  fontFamily: string;
};

export type TextStyle = {
  id: string;
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string | number;
  color: string;
  backgroundColor: string;
  opacity: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
  textDecoration: 'none' | 'underline' | 'line-through';
  fontStyle: 'normal' | 'italic';
  textShadow: {
    enabled: boolean;
    offsetX: number;
    offsetY: number;
    blur: number;
    color: string;
  };
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  zIndex: number;
  width?: number;
  height?: number;
};

export type EditorSlice = {
  colors: {
    backgroundColor: string;
    gradientColors: object[];
    backgroundType: string;
    backgroundImage: string;
    gradientDirection: string;
  };
  activeTab: string;
  threeD: {
    perspective: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
  translateX: number;
  translateY: number;
  imageShadow: number;
  width: number;
  image: any;
  height: number;
  scale: number;
  imageScale: number;
  contentScale: number;
  imageRadius: number;
  canvasRadius: number;
  frame: {
    frameId: number;
    frameTitle: string;
  };
  gridOverlay: boolean;
  canvasTexts: object[];
  elements: object[];
  fixedTextProperties: {
    status: boolean;
    direction: string;
    titleProperties: TextProperties;
    descriptionProperties: TextProperties;
  };

  TextEditingProperty: any;
  shadowSettings: {
    offsetX: number;
    offsetY: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
    inset: boolean;
    enabled: boolean;
  };

  textElements: TextStyle[];
  activeTextId: string | null;
  textDefaults: {
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    color: string;
    backgroundColor: string;
    opacity: number;
    letterSpacing: number;
    lineHeight: number;
    textAlign: 'left' | 'center' | 'right';
    textDecoration: 'none' | 'underline' | 'line-through';
    fontStyle: 'normal' | 'italic';
    textShadow: {
      enabled: boolean;
      offsetX: number;
      offsetY: number;
      blur: number;
      color: string;
    };
  };

  selectedTexts: string[];
};

const initialState: EditorSlice = {
  colors: {
    backgroundColor: "#1E40AF",
    gradientColors: [
      { id: 1, color: "#1E40AF" },
      { id: 2, color: "#7C3AED" },
      { id: 3, color: "#DB2777" },
    ],
    backgroundType: "gradient",
    gradientDirection: "165deg",
    backgroundImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  },
  frame: {
    frameId: 0,
    frameTitle: "",
  },
  activeTab: "image",
  threeD: {
    perspective: 1500,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },
  translateX: 0,
  translateY: 0,
  image: null,
  imageShadow: 12,
  width: 1280,
  height: 720,
  scale: 1,
  imageScale: 1.03,
  contentScale: 0.88,
  gridOverlay: false,
  imageRadius: 16,
  canvasRadius: 20,
  fixedTextProperties: {
    status: false,
    direction: "column",
    titleProperties: {
      value: "Moiful.com: Elevate Your Screenshots",
      fontSize: 80,
      color: "#fff",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
      fontFamily: "sans-serif",
    },
    descriptionProperties: {
      value:
        "Transform ordinary screenshots into captivating masterpieces with Moiful.com. Unlock a world of possibilities and effortlessly enhance your visual content. Start creating stunning images today!",
      fontSize: 40,
      color: "#fff",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
      fontFamily: "sans-serif",
    },
  },
  canvasTexts: [],
  elements: [],
  TextEditingProperty: null,
  shadowSettings: {
    offsetX: 0,
    offsetY: 10,
    blur: 20,
    spread: 0,
    color: "#000000",
    opacity: 0.3,
    inset: false,
    enabled: true,
  },
  textElements: [],
  activeTextId: null,
  textDefaults: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 'normal',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    opacity: 1,
    letterSpacing: 0,
    lineHeight: 1.5,
    textAlign: 'left' as const,
    textDecoration: 'none' as const,
    fontStyle: 'normal' as const,
    textShadow: {
      enabled: false,
      offsetX: 2,
      offsetY: 2,
      blur: 4,
      color: 'rgba(0,0,0,0.5)',
    },
  },
  selectedTexts: [],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<EditorSlice["colors"]>) => {
      state.colors = action.payload;
    },
    setBackgroundType: (state, action: PayloadAction<string>) => {
      state.colors.backgroundType = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setGradientDirection: (state, action: PayloadAction<string>) => {
      state.colors.gradientDirection = action.payload;
    },

    setImageRadius: (state, action: PayloadAction<number>) => {
      state.imageRadius = action.payload;
    },
    setCanvasRadius: (state, action: PayloadAction<number>) => {
      state.canvasRadius = action.payload;
    },
    removeTextEditingProperty: (state) => {
      state.TextEditingProperty = null;
    },
    setGridOverlay: (state, action: PayloadAction<boolean>) => {
      state.gridOverlay = action.payload;
    },

    setImageShadow: (state, action: PayloadAction<number>) => {
      state.imageShadow = action.payload;
    },
    setCanvasTexts: (state, action: PayloadAction<object>) => {
      state.canvasTexts = [...state.canvasTexts, action.payload];
    },
    setTextEditing: (state, action: PayloadAction<object>) => {
      state.TextEditingProperty = action.payload;
    },
    addElement: (state, action: PayloadAction<any>) => {
      state.elements = [...state.elements, action.payload];
    },
    removeElement: (state, action: PayloadAction<any>) => {
      state.elements = state.elements.filter(
        (item: any) => item.id !== action.payload
      );
    },
    updateTextById: (state: any, action: PayloadAction<any>) => {
      const { id, text } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].text = text;
    },
    updateFontSizeById: (state: any, action: PayloadAction<any>) => {
      const { id, fontSize } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].fontSize = fontSize;
    },
    updateColorById: (state: any, action: PayloadAction<any>) => {
      const { id, color } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].color = color;
    },
    removeTextById: (state: any) => {
      state.TextEditingProperty = null;
    },
    updateFontWeightById: (state: any, action: PayloadAction<any>) => {
      const { id, fontWeight } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].fontWeight = fontWeight;
    },
    updateFontStyleById: (state: any, action: PayloadAction<any>) => {
      const { id, fontStyle } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].fontStyle = fontStyle;
    },
    updateTextDecorationById: (state: any, action: PayloadAction<any>) => {
      const { id, textDecoration } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].textDecoration = textDecoration;
    },
    updateFontFamilyById: (state: any, action: PayloadAction<any>) => {
      const { id, fontFamily } = action.payload;
      const index = state.canvasTexts.findIndex((item: any) => item.id === id);
      state.canvasTexts[index].fontFamily = fontFamily;
    },
    setImage: (state, action: PayloadAction<any>) => {
      state.image = action.payload;
    },
    removeImage: (state) => {
      state.image = null;
    },
    removeCanvasTextById: (state, action: PayloadAction<any>) => {
      state.canvasTexts = state.canvasTexts.filter(
        (item: any) => item.id !== action.payload
      );
      state.TextEditingProperty = null;
    },
    setProspective: (state, action: PayloadAction<number>) => {
      state.threeD.perspective = action.payload;
    },
    setRotateX: (state, action: PayloadAction<number>) => {
      state.threeD.rotateX = action.payload;
    },
    setRotateY: (state, action: PayloadAction<number>) => {
      state.threeD.rotateY = action.payload;
    },
    setRotateZ: (state, action: PayloadAction<number>) => {
      state.threeD.rotateZ = action.payload;
    },
    setTranslateX: (state, action: PayloadAction<number>) => {
      state.translateX = action.payload;
    },
    setTranslateY: (state, action: PayloadAction<number>) => {
      state.translateY = action.payload;
    },
    setImageScale: (state, action: PayloadAction<number>) => {
      state.imageScale = action.payload;
    },
    setTitleProperties: (state, action: PayloadAction<TextProperties>) => {
      state.fixedTextProperties.titleProperties = action.payload;
    },
    setDescriptionProperties: (
      state,
      action: PayloadAction<TextProperties>
    ) => {
      state.fixedTextProperties.descriptionProperties = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.fixedTextProperties.status = action.payload;
    },
    setFixedTextDirection: (state, action: PayloadAction<string>) => {
      state.fixedTextProperties.direction = action.payload;
    },
    setContentScale: (state, action: PayloadAction<number>) => {
      state.contentScale = action.payload;
    },
    setBackgroundImage: (state, action: PayloadAction<string>) => {
      state.colors.backgroundImage = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setFrameInfo: (state, action: PayloadAction<any>) => {
      state.frame = action.payload;
    },
    setShadowSettings: (
      state,
      action: PayloadAction<Partial<EditorSlice["shadowSettings"]>>
    ) => {
      state.shadowSettings = { ...state.shadowSettings, ...action.payload };
    },
    addTextElement: (state, action: PayloadAction<Partial<TextStyle>>) => {
      const id = nanoid();
      state.textElements.push({
        ...state.textDefaults,
        ...action.payload,
        id,
        text: action.payload.text || 'Double click to edit',
        position: { x: 50, y: 50 },
        rotation: 0,
        zIndex: state.textElements.length,
      });
      state.activeTextId = id;
    },

    updateTextElement: (state, action: PayloadAction<{ id: string; updates: Partial<TextStyle> }>) => {
      const index = state.textElements.findIndex(el => el.id === action.payload.id);
      if (index !== -1) {
        state.textElements[index] = {
          ...state.textElements[index],
          ...action.payload.updates,
        };
      }
    },

    setActiveText: (state, action: PayloadAction<string | null>) => {
      state.activeTextId = action.payload;
    },

    deleteTextElement: (state, action: PayloadAction<string>) => {
      state.textElements = state.textElements.filter(el => el.id !== action.payload);
      if (state.activeTextId === action.payload) {
        state.activeTextId = null;
      }
    },

    updateTextPosition: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const text = state.textElements.find(el => el.id === action.payload.id);
      if (text) {
        text.position = { x: action.payload.x, y: action.payload.y };
      }
    },

    updateTextRotation: (state, action: PayloadAction<{ id: string; rotation: number }>) => {
      const text = state.textElements.find(el => el.id === action.payload.id);
      if (text) {
        text.rotation = action.payload.rotation;
      }
    },

    updateTextZIndex: (state, action: PayloadAction<{ id: string; zIndex: number }>) => {
      const text = state.textElements.find(el => el.id === action.payload.id);
      if (text) {
        text.zIndex = action.payload.zIndex;
      }
    },

    duplicateTextElement: (state, action: PayloadAction<string>) => {
      const textToDuplicate = state.textElements.find(el => el.id === action.payload);
      if (textToDuplicate) {
        const id = nanoid();
        state.textElements.push({
          ...textToDuplicate,
          id,
          position: {
            x: textToDuplicate.position.x + 20,
            y: textToDuplicate.position.y + 20,
          },
          zIndex: state.textElements.length,
        });
        state.activeTextId = id;
      }
    },

    updateTextDefaults: (state, action: PayloadAction<Partial<EditorSlice["textDefaults"]>>) => {
      state.textDefaults = {
        ...state.textDefaults,
        ...action.payload,
      };
    },

    reorderTextElements: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const [removed] = state.textElements.splice(action.payload.sourceIndex, 1);
      state.textElements.splice(action.payload.destinationIndex, 0, removed);
      // Update zIndex after reordering
      state.textElements.forEach((text, index) => {
        text.zIndex = index;
      });
    },

    updateMultipleTextElements: (state, action: PayloadAction<{ ids: string[]; updates: Partial<TextStyle> }>) => {
      action.payload.ids.forEach(id => {
        const index = state.textElements.findIndex(el => el.id === id);
        if (index !== -1) {
          state.textElements[index] = {
            ...state.textElements[index],
            ...action.payload.updates,
          };
        }
      });
    },

    setSelectedTexts: (state, action: PayloadAction<string[]>) => {
      state.selectedTexts = action.payload;
    },
  },
});

export const {
  setColors,
  setBackgroundType,
  setWidth,
  setHeight,
  setScale,
  setGradientDirection,
  setImageRadius,
  setCanvasRadius,
  setGridOverlay,
  setImageShadow,
  setCanvasTexts,
  setTextEditing,
  updateTextById,
  updateFontSizeById,
  updateColorById,
  removeTextById,
  updateFontWeightById,
  setImage,
  addElement,
  removeElement,
  removeImage,
  removeCanvasTextById,
  removeTextEditingProperty,
  updateFontStyleById,
  updateTextDecorationById,
  updateFontFamilyById,
  setProspective,
  setRotateX,
  setRotateY,
  setRotateZ,
  setTranslateX,
  setTranslateY,
  setImageScale,
  setTitleProperties,
  setDescriptionProperties,
  setStatus,
  setFixedTextDirection,
  setContentScale,
  setBackgroundImage,
  setActiveTab,
  setFrameInfo,
  setShadowSettings,
  addTextElement,
  updateTextElement,
  setActiveText,
  deleteTextElement,
  updateTextPosition,
  updateTextRotation,
  updateTextZIndex,
  duplicateTextElement,
  updateTextDefaults,
  reorderTextElements,
  updateMultipleTextElements,
  setSelectedTexts,
} = editorSlice.actions;
export default editorSlice.reducer;

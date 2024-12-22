import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EditorSlice = {
  // Existing state variables
  colors: {
    gradientColors: object[];
    gradientDirection: string;
  };
  width: number;
  scale: number;
  padding: number;
  background: boolean;
  theme: string;

  threeD: {
    perspective: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
  title: string;
  code: string;

  language: string;
  darkMode: boolean;
  autoDetectLanguage: boolean;
  fontStyle: string;
  fontSize: number;
  watermark: boolean;
};

const initialState: EditorSlice = {
  // Existing initial state
  colors: {
    gradientColors: [
      { id: 25, color: "#6366F1" },
      { id: 26, color: "#6DD7FF" },
    ],
    gradientDirection: "to bottom left",
  },
  threeD: {
    perspective: 1000,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },
  width: 1280,
  scale: 1,
  padding: 100,
  theme: "",
  background: true,
  title: "",
  code: "",
  language: "plaintext",
  darkMode: true,
  autoDetectLanguage: true,
  fontStyle: "jetBrainsMono",
  fontSize: 20,
  watermark: true,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<EditorSlice["colors"]>) => {
      state.colors = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    removeTextById: (state: any) => {
      state.TextEditingProperty = null;
    },
    setPadding: (state, action: PayloadAction<number>) => {
      state.padding = action.payload;
    },
    backgroundToggle: (state, action: PayloadAction<boolean>) => {
      state.background = action.payload;
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
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setAutoDetectLanguage: (state, action: PayloadAction<boolean>) => {
      state.autoDetectLanguage = action.payload;
    },
    setGradientDirection: (state, action: PayloadAction<string>) => {
      state.colors.gradientDirection = action.payload;
    },
    setFontStyle: (state, action: PayloadAction<string>) => {
      state.fontStyle = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setWatermark: (state, action: PayloadAction<boolean>) => {
      state.watermark = action.payload;
    },
  },
});

export const {
  setColors,
  setWidth,
  setScale,
  removeTextById,
  setPadding,
  backgroundToggle,
  setTitle,
  setCode,
  setLanguage,
  setDarkMode,
  setAutoDetectLanguage,
  setFontStyle,
  setFontSize,
  setWatermark,
  setGradientDirection,
  setProspective,
  setRotateX,
  setRotateY,
  setRotateZ,
} = editorSlice.actions;

export default editorSlice.reducer;

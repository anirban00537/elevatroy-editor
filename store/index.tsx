import { combineReducers, configureStore } from "@reduxjs/toolkit";
import editorSlice from "./slice/editor.slice";
import codeEditor from "./slice/codeEditor.slice";
const rootReducer = combineReducers({
  editor: editorSlice,
  code: codeEditor,
});

export default configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

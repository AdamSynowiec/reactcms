import { configureStore } from "@reduxjs/toolkit";
import editorReducer from '../features/editor/editorSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    editor: editorReducer,
    auth: authReducer,
  },
});

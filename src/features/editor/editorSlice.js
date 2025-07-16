import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,
  currentEdit: null,
  liveUpdates: {},
  collectedUIDs: [], // NOWE
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    setCurrentEdit: (state, action) => {
      state.currentEdit = action.payload;
    },
    updateCurrentEditContent: (state, action) => {
      if (state.currentEdit) {
        state.currentEdit.content = action.payload;
        state.liveUpdates[state.currentEdit.uid] = action.payload;
      }
    },
    clearCurrentEdit: (state) => {
      state.currentEdit = null;
    },
    liveUpdate: (state, action) => {
      const { uid, content } = action.payload;
      state.liveUpdates[uid] = content;
    },
    collectUID: (state, action) => {
      if (!state.collectedUIDs.includes(action.payload)) {
        state.collectedUIDs.push(action.payload);
      }
    },
    setLiveUpdates: (state, action) => {
      state.liveUpdates = { ...state.liveUpdates, ...action.payload };
    },
    clearCollectedUIDs: (state) => {
      state.collectedUIDs = [];
    },
  },
});

export const {
  toggleEditMode,
  setCurrentEdit,
  updateCurrentEditContent,
  clearCurrentEdit,
  liveUpdate,
  collectUID,
  setLiveUpdates,
  clearCollectedUIDs,
} = editorSlice.actions;

export default editorSlice.reducer;

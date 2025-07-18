import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    userToken: null,
  },
  reducers: {
    setUserAuthState: (state, action) => {
      state.userId = action.payload.userId;
      state.userToken = action.payload.userToken;
    },
    logout: (state) => {
      state.userId = null;
      state.userToken = null;
    },
  },
});

export const { setUserAuthState, logout } = authSlice.actions;
export default authSlice.reducer;

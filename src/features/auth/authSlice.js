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
  },
});

export const { setUserAuthState } = authSlice.actions;
export default authSlice.reducer;

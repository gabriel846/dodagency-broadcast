// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { authenticatedUser: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthenticatedUser: (state) => {
      state.authenticatedUser = null;
    },
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload.authenticatedUser;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

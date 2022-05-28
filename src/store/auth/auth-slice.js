// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticatedUser: null,
  isInitialFetchingFinished: false,
};

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
    setIsInitialFetchingFinished: (state) => {
      if (!state.isInitialFetchingFinished) {
        state.isInitialFetchingFinished = true;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

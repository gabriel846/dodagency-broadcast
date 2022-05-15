// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentPage: 1 };

const moviesListCurrentPageSlice = createSlice({
  name: "moviesListCurrentPage",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      if (state.currentPage !== action.payload.newCurrentPage) {
        state.currentPage = action.payload.newCurrentPage;
      }
    },
  },
});

export const moviesListCurrentPageActions = moviesListCurrentPageSlice.actions;

export default moviesListCurrentPageSlice;

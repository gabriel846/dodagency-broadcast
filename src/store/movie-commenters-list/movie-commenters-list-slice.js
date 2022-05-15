// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { movieCommentersList: [] };

const movieCommentersListSlice = createSlice({
  name: "movieCommentersList",
  initialState,
  reducers: {
    clearMovieCommentersList: (state) => {
      if (state.movieCommentersList.length > 0) {
        state.movieCommentersList = [];
      }
    },
    addMovieCommenter: (state, action) => {
      state.movieCommentersList.push(action.payload.movieCommenter);
    },
  },
});

export const movieCommentersListActions = movieCommentersListSlice.actions;

export default movieCommentersListSlice;

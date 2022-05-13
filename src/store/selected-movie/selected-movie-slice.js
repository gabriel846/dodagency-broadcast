// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedMovie: null };

const selectedMovieSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload.selectedMovie;
    },
  },
});

export const selectedMovieActions = selectedMovieSlice.actions;

export default selectedMovieSlice;

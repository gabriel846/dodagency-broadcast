// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { moviesList: [] };

const moviesListSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.moviesList.push(action.payload.movie);
    },
    clearMoviesList: (state) => {
      if (state.moviesList.length > 0) {
        state.moviesList = [];
      }
    },
  },
});

export const moviesListActions = moviesListSlice.actions;

export default moviesListSlice;

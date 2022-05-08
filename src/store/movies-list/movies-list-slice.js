// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { moviesList: [] };

const moviesListSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const movie = action.payload.movie;

      state.moviesList.push(movie);
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

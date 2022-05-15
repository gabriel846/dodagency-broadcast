// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { favoriteMoviesList: [] };

const favoriteMoviesListSlice = createSlice({
  name: "favoriteMoviesList",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      state.favoriteMoviesList.push(action.payload.favoriteMovie);
    },
    clearFavoriteMoviesList: (state) => {
      if (state.favoriteMoviesList.length > 0) {
        state.favoriteMoviesList = [];
      }
    },
  },
});

export const favoriteMoviesListActions = favoriteMoviesListSlice.actions;

export default favoriteMoviesListSlice;

// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAddedToFavorites: false };

const isFavoriteMovieSlice = createSlice({
  name: "isFavoriteMovie",
  initialState,
  reducers: {
    resetIsAddedToFavorites: (state) => {
      if (state.isAddedToFavorites) {
        state.isAddedToFavorites = !state.isAddedToFavorites;
      }
    },
    setIsAddedToFavorites: (state, action) => {
      state.isAddedToFavorites = action.payload.isAddedToFavorites;
    },
  },
});

export const isFavoriteMovieActions = isFavoriteMovieSlice.actions;

export default isFavoriteMovieSlice;

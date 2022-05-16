// Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAddedToFavorites: false };

const movieIsAddedToFavoritesSlice = createSlice({
  name: "movieIsAddedToFavorites",
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

export const movieIsAddedToFavoritesActions =
  movieIsAddedToFavoritesSlice.actions;

export default movieIsAddedToFavoritesSlice;

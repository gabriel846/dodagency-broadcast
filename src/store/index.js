// Packages
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux slices
import authSlice from "./auth/auth-slice";
import moviesListSlice from "./movies-list/movies-list-slice";

const reducersList = combineReducers({
  auth: authSlice.reducer,
  moviesList: moviesListSlice.reducer,
});

const store = configureStore({ reducer: reducersList });

export default store;

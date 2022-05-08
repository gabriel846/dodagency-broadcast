// Packages
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux slices
import moviesListSlice from "./movies-list/movies-list-slice";

const reducersList = combineReducers({ moviesList: moviesListSlice.reducer });

const store = configureStore({ reducer: reducersList });

export default store;

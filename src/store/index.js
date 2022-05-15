// Packages
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux slices
import authSlice from "./auth/auth-slice";
import commentsListSlice from "./comments-list/comments-list-slice";
import favoriteMoviesListSlice from "./favorite-movies-list/favorite-movies-list-slice";
import moviesListSlice from "./movies-list/movies-list-slice";
import moviesListCurrentPageSlice from "./movies-list-current-page/movies-list-current-page-slice";
import selectedMovieSlice from "./selected-movie/selected-movie-slice";
import movieCommentersListSlice from "./movie-commenters-list/movie-commenters-list-slice";

const reducersList = combineReducers({
  auth: authSlice.reducer,
  commentsList: commentsListSlice.reducer,
  favoriteMoviesList: favoriteMoviesListSlice.reducer,
  movieCommentersList: movieCommentersListSlice.reducer,
  moviesListCurrentPage: moviesListCurrentPageSlice.reducer,
  moviesList: moviesListSlice.reducer,
  selectedMovie: selectedMovieSlice.reducer,
});

const store = configureStore({ reducer: reducersList });

export default store;

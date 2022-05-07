// Packages
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchMoviesList } from "../../store/movies-list/movies-list-actions";

// Redux slices
import { moviesListActions } from "../../store/movies-list/movies-list-slice";

// Components
import { MovieGenresList } from "../../components/MovieGenresList/MovieGenresList";
import { MoviesList } from "../../components/MoviesList";

// Theme
import { getMovieGenresList } from "../../environment/theme/Methods";
import {
  CANCEL_FETCHING_NUMBER_OF_MOVIES_MESSAGE,
  MOVIES_LIST_URL,
  NO_DATA_MESSAGE,
} from "../../environment/theme/Variables";

export function Home() {
  const [numberOfMovies, setNumberOfMovies] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesListActions.clearMoviesList());
    dispatch(fetchMoviesList());
  }, [dispatch]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get(MOVIES_LIST_URL, { cancelToken: cancelTokenSource.token })
      .then((response) =>
        response.data
          ? Object.values(response.data.data.movies).filter(
              (movie) => movie.title
            ).length
          : 0
      )
      .then((moviesListLength) => setNumberOfMovies(moviesListLength));

    return () =>
      cancelTokenSource.cancel(CANCEL_FETCHING_NUMBER_OF_MOVIES_MESSAGE);
  }, []);

  const moviesList = useSelector((state) => state.moviesList.moviesList);
  const movieGenresList = getMovieGenresList(moviesList);

  return (
    <>
      {numberOfMovies > 0 && (
        <MovieGenresList movieGenresList={movieGenresList} />
      )}
      <MoviesList
        moviesList={moviesList}
        noDataFoundMessage={NO_DATA_MESSAGE}
        numberOfMovies={numberOfMovies}
      />
    </>
  );
}

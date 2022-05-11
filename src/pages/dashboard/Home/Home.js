// Packages
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchMoviesList } from "../../../store/movies-list/movies-list-actions";

// Redux slices
import { moviesListActions } from "../../../store/movies-list/movies-list-slice";

// Components
import { MovieGenresList } from "../../../components/MovieGenresList/MovieGenresList";
import { MoviesList } from "../../../components/MoviesList";
import { MoviesListNavigation } from "../../../components/MoviesListNavigation/MoviesListNavigation";

// Theme
import { getMovieGenresList } from "../../../environment/theme/Methods";
import {
  CANCEL_FETCHING_NUMBER_OF_MOVIES_MESSAGE,
  MOVIES_LIST_URL_WITH_PAGE,
  NO_DATA_MESSAGE,
} from "../../../environment/theme/Variables";

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfMovies, setNumberOfMovies] = useState(-1);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState("All");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesListActions.clearMoviesList());
    dispatch(fetchMoviesList(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get(MOVIES_LIST_URL_WITH_PAGE, { cancelToken: cancelTokenSource.token })
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
  const isLoading = moviesList.length !== numberOfMovies;

  const onPreviousButtonClickHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => --currentPage);
      setSelectedMovieGenre("All");
    }
  };

  const onNextButtonClickHandler = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => ++currentPage);
      setSelectedMovieGenre("All");
    }
  };

  const switchSelectedMovieGenre = (newSelectedMovieGenre) => {
    setSelectedMovieGenre((previousSelectedMovieGenre) =>
      previousSelectedMovieGenre !== newSelectedMovieGenre
        ? newSelectedMovieGenre
        : "All"
    );
  };

  return (
    <>
      {!isLoading && numberOfMovies > 0 && (
        <MovieGenresList
          movieGenresList={movieGenresList}
          onMovieGenreClick={switchSelectedMovieGenre}
          selectedMovieGenre={selectedMovieGenre}
        />
      )}
      {!isLoading && numberOfMovies > 0 && (
        <MoviesListNavigation
          currentPage={currentPage}
          onNextButtonClick={onNextButtonClickHandler}
          onPreviousButtonClick={onPreviousButtonClickHandler}
        />
      )}
      <MoviesList
        isLoading={isLoading}
        moviesList={moviesList}
        noDataFoundMessage={NO_DATA_MESSAGE}
        numberOfMovies={numberOfMovies}
        selectedMovieGenre={selectedMovieGenre}
      />
    </>
  );
}

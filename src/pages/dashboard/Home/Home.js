// Packages
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchMoviesList } from "../../../store/movies-list/movies-list-actions";

// Redux slices
import { moviesListActions } from "../../../store/movies-list/movies-list-slice";
import { moviesListCurrentPageActions } from "../../../store/movies-list-current-page/movies-list-current-page-slice";

// Components
import { Button } from "../../../components/UI/Button";
import { MovieGenresList } from "../../../components/MovieGenresList/MovieGenresList";
import { MoviesList } from "../../../components/MoviesList";
import { MoviesListNavigation } from "../../../components/MoviesListNavigation/MoviesListNavigation";

// Theme
import { getMovieGenresList } from "../../../environment/theme/Methods";
import {
  BACK_TO_TOP_BUTTON_STYLE,
  CANCEL_FETCHING_NUMBER_OF_MOVIES_MESSAGE,
  LOADING_MESSAGE,
  MOVIES_LIST_URL_WITH_PAGE,
  NO_MOVIES_FOUND_MESSAGE,
} from "../../../environment/theme/Variables";

export function Home() {
  const [currentPage, setCurrentPage] = useState(
    useSelector((state) => state.moviesListCurrentPage.currentPage)
  );
  const [numberOfMovies, setNumberOfMovies] = useState(-1);
  const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);

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
        !!response.data
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
      dispatch(
        moviesListCurrentPageActions.setCurrentPage({
          newCurrentPage: currentPage - 1,
        })
      );
      setCurrentPage((currentPage) => --currentPage);
      setSelectedMovieGenres([]);
    }
  };

  const onNextButtonClickHandler = () => {
    if (currentPage > 0) {
      dispatch(
        moviesListCurrentPageActions.setCurrentPage({
          newCurrentPage: currentPage + 1,
        })
      );
      setCurrentPage((currentPage) => ++currentPage);
      setSelectedMovieGenres([]);
    }
  };

  const selectMovieGenreHandler = (newSelectedMovieGenre) => {
    if (selectedMovieGenres.indexOf(newSelectedMovieGenre) > -1) {
      setSelectedMovieGenres((oldArray) =>
        oldArray.filter((element) => element !== newSelectedMovieGenre)
      );
    } else {
      setSelectedMovieGenres((oldArray) => [
        ...oldArray,
        newSelectedMovieGenre,
      ]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5em" }}>
      {!isLoading && numberOfMovies > 0 && (
        <MovieGenresList
          movieGenresList={movieGenresList}
          onMovieGenreClick={selectMovieGenreHandler}
          selectedMovieGenres={selectedMovieGenres.sort()}
        />
      )}
      {!isLoading && numberOfMovies > 0 && (
        <MoviesListNavigation
          currentPage={currentPage}
          isCurrentPageShown
          onNextButtonClick={onNextButtonClickHandler}
          onPreviousButtonClick={onPreviousButtonClickHandler}
        />
      )}
      <MoviesList
        isLoading={isLoading}
        isLoadingMessage={LOADING_MESSAGE}
        moviesList={moviesList}
        noDataFoundMessage={NO_MOVIES_FOUND_MESSAGE}
        numberOfMovies={numberOfMovies}
        selectedMovieGenres={selectedMovieGenres.sort()}
      />
      {!isLoading && numberOfMovies > 0 && (
        <MoviesListNavigation
          currentPage={currentPage}
          onNextButtonClick={onNextButtonClickHandler}
          onPreviousButtonClick={onPreviousButtonClickHandler}
        />
      )}
      {!isLoading && numberOfMovies > 0 && (
        <Button
          onClick={() => window.scrollTo(0, 0)}
          style={BACK_TO_TOP_BUTTON_STYLE}
          text="Back to the top"
        />
      )}
    </div>
  );
}

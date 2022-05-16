// Packages
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchFavoriteMoviesList } from "../../../store/favorite-movies-list/favorite-movies-list-actions";

// Components
import { GoBackIcon } from "../../../components/UI/GoBackIcon";
import { MovieGenresList } from "../../../components/MovieGenresList";
import { MoviesList } from "../../../components/MoviesList";

// Theme
import { getMovieGenresList } from "../../../environment/theme/Methods";
import {
  CANCEL_FETCHING_NUMBER_OF_FAVORITE_MOVIES_MESSAGE,
  FETCHING_FAVORITE_MOVIES_MESSAGE,
  NO_MOVIES_FOUND_MESSAGE,
} from "../../../environment/theme/Variables";

export function FavoriteMovies(props) {
  const [numberOfFavoriteMovies, setNumberOfFavoriteMovies] = useState(-1);
  const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);
  const { authenticatedUser } = props;
  const dispatch = useDispatch();
  const { REACT_APP_REALTIME_DATABASE_URL: DATABASE_URL } = process.env;

  useEffect(() => {
    dispatch(fetchFavoriteMoviesList(authenticatedUser.id));
  }, [authenticatedUser.id, dispatch]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get(
        `${DATABASE_URL}/users/${authenticatedUser.id}/favoriteMovies.json`,
        {
          cancelToken: cancelTokenSource.token,
        }
      )
      .then((response) =>
        !!response.data ? Object.keys(response.data).length : 0
      )
      .then((favoriteMoviesListLength) =>
        setNumberOfFavoriteMovies(favoriteMoviesListLength)
      );

    return () =>
      cancelTokenSource.cancel(
        CANCEL_FETCHING_NUMBER_OF_FAVORITE_MOVIES_MESSAGE
      );
  }, [authenticatedUser.id, DATABASE_URL]);

  const favoriteMovies = useSelector(
    (state) => state.favoriteMoviesList.favoriteMoviesList
  );

  const movieGenresList = getMovieGenresList(favoriteMovies);
  const isLoading = favoriteMovies.length !== numberOfFavoriteMovies;

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
      {!isLoading && <GoBackIcon />}
      {!isLoading && numberOfFavoriteMovies > 0 && (
        <MovieGenresList
          movieGenresList={movieGenresList}
          onMovieGenreClick={selectMovieGenreHandler}
          selectedMovieGenres={selectedMovieGenres.sort()}
        />
      )}
      <MoviesList
        isLoading={isLoading}
        isLoadingMessage={FETCHING_FAVORITE_MOVIES_MESSAGE}
        moviesList={favoriteMovies}
        noDataFoundMessage={NO_MOVIES_FOUND_MESSAGE}
        numberOfMovies={numberOfFavoriteMovies}
        selectedMovieGenres={selectedMovieGenres.sort()}
      />
    </div>
  );
}

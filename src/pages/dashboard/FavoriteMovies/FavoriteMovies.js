// Packages
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux actions
import { fetchFavoriteMoviesList } from "../../../store/favorite-movies-list/favorite-movies-list-actions";

// Components
import { Button } from "../../../components/UI/Button";
import { MovieGenresList } from "../../../components/MovieGenresList";
import { MoviesList } from "../../../components/MoviesList";

// Theme
import { getMovieGenresList } from "../../../environment/theme/Methods";
import {
  CANCEL_FETCHING_NUMBER_OF_FAVORITE_MOVIES_MESSAGE,
  FAVORITE_MOVIES_NO_DATA_FOUND_BUTTON_STYLE,
  FETCHING_FAVORITE_MOVIES_MESSAGE,
  NO_MOVIES_FOUND_MESSAGE,
} from "../../../environment/theme/Variables";

// Stylings
import { StyledFavoriteMoviesContainer } from "./FavoriteMovies.style";

export function FavoriteMovies() {
  const [numberOfFavoriteMovies, setNumberOfFavoriteMovies] = useState(-1);
  const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { REACT_APP_REALTIME_DATABASE_URL: DATABASE_URL } = process.env;
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

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
    <StyledFavoriteMoviesContainer>
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
      {!isLoading && (
        <Button
          onClick={() => history.goBack()}
          style={FAVORITE_MOVIES_NO_DATA_FOUND_BUTTON_STYLE}
          text="Go back"
        />
      )}
    </StyledFavoriteMoviesContainer>
  );
}

// Packages
import React from "react";

// Components
import { Error } from "../Error";
import { Loading } from "../Loading";
import { Movie } from "../Movie";

// Themes
import { arrayContainsAllElementsFrom } from "../../environment/theme/Methods";
import {
  ERROR_CONTAINER_STYLE,
  ERROR_MESSAGE_STYLE,
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE_STYLE,
  NO_DATA_CONTAINER_STYLE,
  NO_DATA_MESSAGE_STYLE,
  NO_FILTERED_MOVIES_FOUND,
} from "../../environment/theme/Variables";

// Stylings
import {
  StyledMoviesList,
  StyledNoFilteredMoviesWereFoundMessage,
} from "./MoviesList.style";

export function MoviesList(props) {
  const {
    isLoading,
    isLoadingMessage,
    hasError,
    hasErrorMessage,
    moviesList,
    noDataFoundMessage,
    numberOfMovies,
    selectedMovieGenres,
  } = props;

  const filteredMoviesList = !!selectedMovieGenres
    ? moviesList.filter((movie) =>
        selectedMovieGenres === [] || !!!movie.genres
          ? movie
          : arrayContainsAllElementsFrom(movie.genres, selectedMovieGenres)
      )
    : moviesList;

  return (
    <>
      {isLoading ? (
        <Loading
          containerStyle={LOADING_CONTAINER_STYLE}
          message={isLoadingMessage}
          textStyle={LOADING_MESSAGE_STYLE}
        />
      ) : hasError ? (
        <Error
          containerStyle={ERROR_CONTAINER_STYLE}
          message={hasErrorMessage}
          textStyle={ERROR_MESSAGE_STYLE}
        />
      ) : numberOfMovies === 0 ? (
        <Loading
          containerStyle={NO_DATA_CONTAINER_STYLE}
          message={noDataFoundMessage}
          textStyle={NO_DATA_MESSAGE_STYLE}
        />
      ) : filteredMoviesList.length > 0 ? (
        <StyledMoviesList>
          {filteredMoviesList.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </StyledMoviesList>
      ) : (
        <StyledNoFilteredMoviesWereFoundMessage>
          {NO_FILTERED_MOVIES_FOUND}
        </StyledNoFilteredMoviesWereFoundMessage>
      )}
    </>
  );
}

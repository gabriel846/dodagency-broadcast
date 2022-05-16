// Packages
import React from "react";

// Components
import { Loading } from "../Loading";
import { Movie } from "../Movie";

// Themes
import COLORS from "../../environment/theme/Colors";
import {
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE_STYLE,
  NO_DATA_CONTAINER_STYLE,
  NO_DATA_MESSAGE_STYLE,
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
    moviesList,
    noDataFoundMessage,
    numberOfMovies,
    selectedMovieGenres,
  } = props;

  const arrayContainsAllElementsFrom = (array, target) =>
    target.every((element) => array.includes(element));

  const filteredMoviesList = moviesList.filter((movie) =>
    selectedMovieGenres === [] || !!!movie.genres
      ? movie
      : arrayContainsAllElementsFrom(movie.genres, selectedMovieGenres)
  );

  return (
    <>
      {isLoading ? (
        <Loading
          containerStyle={LOADING_CONTAINER_STYLE}
          message={isLoadingMessage}
          textStyle={LOADING_MESSAGE_STYLE}
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
          No movie containing the selected genres was found...
        </StyledNoFilteredMoviesWereFoundMessage>
      )}
    </>
  );
}

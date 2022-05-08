// Packages
import React from "react";

// Components
import { Loading } from "../Loading";
import { Movie } from "../Movie";

// Themes
import {
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE,
  LOADING_MESSAGE_STYLE,
  NO_DATA_CONTAINER_STYLE,
  NO_DATA_MESSAGE_STYLE,
} from "../../environment/theme/Variables";

// Stylings
import { StyledMoviesList } from "./MoviesList.style";

export function MoviesList(props) {
  const { isLoading, moviesList, noDataFoundMessage, numberOfMovies } = props;

  return (
    <>
      {isLoading ? (
        <Loading
          containerStyle={LOADING_CONTAINER_STYLE}
          message={LOADING_MESSAGE}
          textStyle={LOADING_MESSAGE_STYLE}
        />
      ) : numberOfMovies === 0 ? (
        <Loading
          containerStyle={NO_DATA_CONTAINER_STYLE}
          message={noDataFoundMessage}
          textStyle={NO_DATA_MESSAGE_STYLE}
        />
      ) : (
        <StyledMoviesList>
          {moviesList.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </StyledMoviesList>
      )}
    </>
  );
}

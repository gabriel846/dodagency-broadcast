// Packages
import React, { useEffect, useState } from "react";

// Components
import { Loading } from "../Loading";
import { Movie } from "../Movie";

// Themes
import {
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE,
  LOADING_MESSAGE_STYLE,
  NO_DATA_CONTAINER_STYLE,
  NO_DATA_MESSAGE,
  NO_DATA_MESSAGE_STYLE,
} from "../../environment/theme/Variables";

// Stylings
import { StyledMoviesList } from "./MoviesList.style";

export function MoviesList(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { moviesList, numberOfMovies } = props;

  const isMoviesListSuccessfullyRetrieved =
    moviesList.length === numberOfMovies;

  useEffect(() => {
    if (isMoviesListSuccessfullyRetrieved && isLoading) {
      setIsLoading((previousValue) => !previousValue);
    }
  }, [isLoading, isMoviesListSuccessfullyRetrieved]);

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
          message={NO_DATA_MESSAGE}
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

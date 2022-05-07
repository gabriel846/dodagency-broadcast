// Packages
import React from "react";

// Components
import { Movie } from "../Movie";

// Stylings
import { StyledMoviesList } from "./MoviesList.style";

export function MoviesList(props) {
  const { moviesList } = props;

  return (
    <StyledMoviesList>
      {moviesList.map((movie, index) => (
        <Movie key={index} movie={movie} />
      ))}
    </StyledMoviesList>
  );
}

// Packages
import React from "react";

// Stylings
import {
  StyledMovieGenre,
  StyledMovieGenreContainer,
} from "./MovieGenre.style";

export function MovieGenre(props) {
  const { movieGenre } = props;

  return (
    <StyledMovieGenre>
      <StyledMovieGenreContainer>{movieGenre}</StyledMovieGenreContainer>
    </StyledMovieGenre>
  );
}

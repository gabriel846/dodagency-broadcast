// Packages
import React from "react";

// Stylings
import {
  StyledMovieGenre,
  StyledMovieGenreContainer,
} from "./MovieGenre.style";

export function MovieGenre(props) {
  const { isSelected, movieGenre, onMovieGenreClick } = props;

  return (
    <StyledMovieGenre onClick={onMovieGenreClick}>
      <StyledMovieGenreContainer isSelected={isSelected}>
        {movieGenre}
      </StyledMovieGenreContainer>
    </StyledMovieGenre>
  );
}

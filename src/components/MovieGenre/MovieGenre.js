// Packages
import React from "react";

// Stylings
import {
  StyledMovieGenre,
  StyledMovieGenreContainer,
} from "./MovieGenre.style";

export function MovieGenre(props) {
  const { isSelected, movieGenre, onMovieGenreClick } = props;

  if (isSelected) {
    console.log(`isSelected: ${movieGenre}`);
  }

  return (
    <StyledMovieGenre onClick={() => onMovieGenreClick(movieGenre)}>
      <StyledMovieGenreContainer isSelected={isSelected}>
        {movieGenre}
      </StyledMovieGenreContainer>
    </StyledMovieGenre>
  );
}

// Packages
import React from "react";

// Components
import { MovieGenre } from "../MovieGenre/MovieGenre";

// Stylings
import { StyledMovieGenresList } from "./MovieGenresList.style";

export function MovieGenresList(props) {
  const { movieGenresList } = props;

  return (
    <StyledMovieGenresList>
      {movieGenresList.map((movieGenre, index) => (
        <MovieGenre key={index} movieGenre={movieGenre} />
      ))}
    </StyledMovieGenresList>
  );
}

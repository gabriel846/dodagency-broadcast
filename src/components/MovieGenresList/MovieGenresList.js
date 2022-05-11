// Packages
import React from "react";

// Components
import { MovieGenre } from "../MovieGenre/MovieGenre";

// Stylings
import { StyledMovieGenresList } from "./MovieGenresList.style";

export function MovieGenresList(props) {
  const { movieGenresList, onMovieGenreClick, selectedMovieGenre } = props;

  return (
    <StyledMovieGenresList>
      {movieGenresList.map((movieGenre, index) => (
        <MovieGenre
          isSelected={movieGenre === selectedMovieGenre}
          key={index}
          movieGenre={movieGenre}
          onMovieGenreClick={onMovieGenreClick}
        />
      ))}
    </StyledMovieGenresList>
  );
}

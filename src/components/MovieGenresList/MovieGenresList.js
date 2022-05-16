// Packages
import React from "react";

// Components
import { MovieGenre } from "../MovieGenre/MovieGenre";

// Stylings
import { StyledMovieGenresList } from "./MovieGenresList.style";

export function MovieGenresList(props) {
  const { movieGenresList, onMovieGenreClick, selectedMovieGenres, style } =
    props;

  return (
    <StyledMovieGenresList style={style}>
      {movieGenresList.map((movieGenre, index) => (
        <MovieGenre
          isSelected={
            !!selectedMovieGenres && selectedMovieGenres.includes(movieGenre)
          }
          key={index}
          movieGenre={movieGenre}
          onMovieGenreClick={() => onMovieGenreClick(movieGenre)}
        />
      ))}
    </StyledMovieGenresList>
  );
}

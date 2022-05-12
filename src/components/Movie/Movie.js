// Packages
import React from "react";

// Stylings
import { StyledMovie, StyledMovieImage, StyledMovieTitle } from "./Movie.style";

export function Movie(props) {
  const { movie } = props;

  console.log(movie);

  return (
    <StyledMovie>
      <StyledMovieImage
        alt={movie.title}
        onError={() => alert(`error loading image: ${movie.title}`)}
        src={movie.large_cover_image}
      />
      <StyledMovieTitle>{`${movie.title} (${movie.year})`}</StyledMovieTitle>
    </StyledMovie>
  );
}

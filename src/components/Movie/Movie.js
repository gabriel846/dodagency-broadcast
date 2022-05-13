// Packages
import React from "react";
import { useHistory } from "react-router-dom";

// Stylings
import { StyledMovie, StyledMovieImage, StyledMovieTitle } from "./Movie.style";

export function Movie(props) {
  const { movie } = props;
  const { id: movieID } = movie;
  const history = useHistory();

  return (
    <StyledMovie onClick={() => history.push(`/details/${movieID}`)}>
      <StyledMovieImage
        alt={movie.title}
        onError={() => console.log(`error loading image: ${movie.title}`)}
        src={movie.large_cover_image}
      />
      <StyledMovieTitle>{movie.title_long}</StyledMovieTitle>
    </StyledMovie>
  );
}

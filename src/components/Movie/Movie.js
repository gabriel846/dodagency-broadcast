// Packages
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Theme
import COLORS from "../../environment/theme/Colors";

// Stylings
import { StyledMovie, StyledMovieImage, StyledMovieTitle } from "./Movie.style";

export function Movie(props) {
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const { movie } = props;
  const history = useHistory();

  return (
    <StyledMovie onClick={() => history.push(`/details/${movie.id}`)}>
      {!hasLoadingError && (
        <StyledMovieImage
          alt={movie.title_long}
          onError={() => setHasLoadingError((previousValue) => !previousValue)}
          src={movie.large_cover_image}
          style={{ color: COLORS.SECONDARY }}
        />
      )}
      <StyledMovieTitle hasLoadingError={hasLoadingError}>
        {movie.title_long}
      </StyledMovieTitle>
    </StyledMovie>
  );
}

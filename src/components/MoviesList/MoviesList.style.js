// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledMoviesList = styled.ul`
  display: grid;
  gap: 2em;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  margin: 0;
  padding: 0;

  @media screen and (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const StyledNoFilteredMoviesWereFoundMessage = styled.h1`
  color: ${COLORS.SECONDARY};
  margin: 0;
  text-align: center;
  user-select: none;
`;

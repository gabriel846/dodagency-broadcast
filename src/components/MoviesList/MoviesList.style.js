// Packages
import styled from "styled-components";

export const StyledMoviesList = styled.ul`
  display: grid;
  gap: 2em;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  padding: 0;

  @media screen and (max-width: 1800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(1, 1fr);
  }
  ${
    "" /* @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  } */
  }
`;

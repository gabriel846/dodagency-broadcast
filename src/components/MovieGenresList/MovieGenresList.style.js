// Packages
import styled from "styled-components";

export const StyledMovieGenresList = styled.ul`
  display: grid;
  gap: 1em;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  margin: 0;
  padding: 0;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

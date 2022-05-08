// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledMovieGenre = styled.li`
  list-style-type: none;
`;

export const StyledMovieGenreContainer = styled.div`
  align-items: center;
  border: 0.25em solid ${COLORS.SECONDARY};
  color: ${COLORS.SECONDARY};
  display: flex;
  font-size: large;
  font-weight: bold;
  justify-content: center;
  padding: 1em;
  transition: 0.6s ease;
  user-select: none;

  &:hover {
    background-color: ${COLORS.SECONDARY};
    box-shadow: ${COLORS.SECONDARY} 0px 10px 25px -10px !important;
    color: ${COLORS.PRIMARY};
  }

  @media screen and (max-width: 992px) {
    padding: 0.75em;
  }
  @media screen and (max-width: 768px) {
    padding: 0.5em;
  }
`;

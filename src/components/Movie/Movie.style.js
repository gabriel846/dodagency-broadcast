// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledMovie = styled.li`
  list-style-type: none;
`;

export const StyledMovieImage = styled.img`
  border-radius: 2em 2em 0px 0px;
  height: auto;
  transition: 0.6s ease;
  width: 100%;

  &:hover {
    box-shadow: ${COLORS.SECONDARY} 0px 25px 50px -12px !important;
  }
`;

export const StyledMovieTitle = styled.p`
  background-color: ${COLORS.SECONDARY};
  border-radius: 0px 0px 2em 2em;
  color: ${COLORS.PRIMARY};
  font-size: large;
  font-weight: bold;
  margin: 0;
  padding: 1em;
  text-align: center;
  text-overflow: ellipsis;
`;

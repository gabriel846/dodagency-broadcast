// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledMovie = styled.li`
  display: flex;
  flex-direction: column;
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

export const StyledMovieTitle = styled.div`
  align-items: center;
  background-color: ${COLORS.SECONDARY};
  border-bottom-left-radius: 2em;
  border-bottom-right-radius: 2em;
  ${(props) =>
    props.hasLoadingError &&
    "border-top-left-radius: 2em; border-top-right-radius: 2em;"}
  color: ${COLORS.PRIMARY};
  display: flex;
  flex: 1;
  font-size: large;
  font-weight: bold;
  justify-content: center;
  margin: 0;
  padding: 1em;
  text-align: center;
  text-overflow: ellipsis;
  user-select: none;
`;

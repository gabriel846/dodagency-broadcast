// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledMoviesListNavigationButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 10em 10em;
  justify-content: space-between;
`;

export const StyledMoviesListNavigationMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5em;
`;

export const StyledMoviesListNavigationPage = styled.span`
  align-items: center;
  color: ${COLORS.SECONDARY};
  display: flex;
  font-size: x-large;
  font-weight: bold;
  justify-content: center;
  user-select: none;
`;

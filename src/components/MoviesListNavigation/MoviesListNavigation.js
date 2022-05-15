// Packages
import React from "react";

// Components
import { Button } from "../UI/Button";

// Theme
import {
  NEXT_BUTTON_STYLE,
  PREVIOUS_BUTTON_STYLE,
} from "../../environment/theme/Variables";

// Stylings
import {
  StyledMoviesListNavigationButtonsContainer,
  StyledMoviesListNavigationMainContainer,
  StyledMoviesListNavigationPage,
} from "./MoviesListNavigation.style";

export function MoviesListNavigation(props) {
  const { currentPage, onNextButtonClick, onPreviousButtonClick } = props;

  return (
    <StyledMoviesListNavigationMainContainer>
      <StyledMoviesListNavigationButtonsContainer>
        <Button
          onClick={onPreviousButtonClick}
          style={{ ...PREVIOUS_BUTTON_STYLE }}
          text="Previous"
          visible={currentPage > 1}
        />
        <Button
          onClick={onNextButtonClick}
          style={{ ...NEXT_BUTTON_STYLE }}
          text="Next"
          visible
        />
      </StyledMoviesListNavigationButtonsContainer>
      <StyledMoviesListNavigationPage>
        Current page: {currentPage}
      </StyledMoviesListNavigationPage>
    </StyledMoviesListNavigationMainContainer>
  );
}

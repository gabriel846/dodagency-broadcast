// Packages
import React from "react";
import { useHistory } from "react-router-dom";

// Components
import { Button } from "../../../components/UI/Button";

// Theme
import { PAGE_NOT_FOUND_BUTTON_STYLE } from "../../../environment/theme/Variables";

// Stylings
import { StyledNotFoundContainer } from "./NotFound.style";

export function NotFound() {
  const history = useHistory();

  return (
    <StyledNotFoundContainer>
      <h1 style={{ margin: 0 }}>Page Not Found</h1>
      <Button
        onClick={() => history.goBack()}
        style={PAGE_NOT_FOUND_BUTTON_STYLE}
        text="Go back"
      />
    </StyledNotFoundContainer>
  );
}

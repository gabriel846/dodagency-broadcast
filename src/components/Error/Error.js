// Packages
import React from "react";
import { useHistory } from "react-router-dom";

// Components
import { Button } from "../UI/Button";

// Theme
import { GO_BACK_BUTTON_STYLE } from "../../environment/theme/Variables";

export function Error(props) {
  const { containerStyle, hasGoBackButton, message, textStyle } = props;
  const history = useHistory();

  return (
    <div style={containerStyle}>
      <h1 style={textStyle}>{message}</h1>
      {hasGoBackButton && (
        <Button
          onClick={() => history.goBack()}
          style={GO_BACK_BUTTON_STYLE}
          text="Go back"
        />
      )}
    </div>
  );
}

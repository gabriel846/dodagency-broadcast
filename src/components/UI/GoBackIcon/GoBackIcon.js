// Packages
import React from "react";
import { useHistory } from "react-router-dom";

// Stylings
import { StyledGoBackIcon } from "./GoBackIcon.style";

export function GoBackIcon(props) {
  const { size, style } = props;
  const history = useHistory();

  return (
    <StyledGoBackIcon
      onClick={() => history.goBack()}
      size={size}
      style={style}
    />
  );
}

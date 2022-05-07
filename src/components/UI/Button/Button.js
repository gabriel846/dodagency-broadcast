// Packages
import React from "react";

// Stylings
import { StyledButton } from "./Button.style";

export function Button(props) {
  const { onClick, style, text } = props;

  return (
    <StyledButton onClick={onClick} style={style}>
      {text}
    </StyledButton>
  );
}

// Packages
import React from "react";

// Stylings
import { StyledButton } from "./Button.style";

export function Button(props) {
  const { onClick, style, text, visible } = props;

  return (
    <StyledButton onClick={onClick} style={style} visible={visible}>
      {text}
    </StyledButton>
  );
}

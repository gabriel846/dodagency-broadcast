// Packages
import React from "react";

// Stylings
import { StyledButton } from "./Button.style";

export function Button(props) {
  const { onClick, style, text, type, visible } = props;

  return (
    <StyledButton onClick={onClick} style={style} type={type} visible={visible}>
      {text}
    </StyledButton>
  );
}

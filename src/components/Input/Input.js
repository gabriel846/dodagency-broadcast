// Packages
import React from "react";

// Stylings
import { StyledInput } from "./Input.style";

export function Input(props) {
  const { cursorColor, placeholder, placeholderColor, style, type } = props;

  return (
    <StyledInput
      cursorColor={cursorColor}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      spellCheck={false}
      style={style}
      type={type}
    />
  );
}

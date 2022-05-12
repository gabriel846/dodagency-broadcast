// Packages
import React from "react";

// Stylings
import { StyledInput } from "./Input.style";

export function Input(props) {
  const {
    cursorColor,
    onBlur,
    onChange,
    placeholder,
    placeholderColor,
    style,
    type,
    value,
  } = props;

  return (
    <StyledInput
      cursorColor={cursorColor}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      spellCheck={false}
      style={style}
      type={type}
      value={value}
    />
  );
}

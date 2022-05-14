// Packages
import React from "react";

// Stylings
import { StyledBaseInput } from "./BaseInput.style";

export function BaseInput(props) {
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
    <StyledBaseInput
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

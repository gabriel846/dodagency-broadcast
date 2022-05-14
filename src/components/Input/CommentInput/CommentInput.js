// Packages
import React from "react";

// Stylings
import { StyledCommentInput } from "./CommentInput.style";

export function CommentInput(props) {
  const { onBlur, onChange, placeholder, placeholderColor, style, value } =
    props;

  return (
    <StyledCommentInput
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      spellCheck="false"
      style={style}
      value={value}
    />
  );
}

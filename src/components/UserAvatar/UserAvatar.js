// Packages
import React from "react";

// Stylings
import { StyledUserAvatar } from "./UserAvatar.style";

export function UserAvatar(props) {
  const { onClick, size, style, textSize, user } = props;
  const { name } = user || "?";

  return (
    <StyledUserAvatar
      onClick={onClick}
      size={size}
      style={style}
      textSize={textSize}
    >
      {!!name ? name.charAt(0) : "?"}
    </StyledUserAvatar>
  );
}

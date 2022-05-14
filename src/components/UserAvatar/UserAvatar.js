// Packages
import React from "react";

// Stylings
import { StyledUserAvatar } from "./UserAvatar.style";

export function UserAvatar(props) {
  const { onClick, style, user } = props;
  const { name } = user;

  return (
    <StyledUserAvatar onClick={onClick} style={style}>
      {!!name ? name.charAt(0) : "?"}
    </StyledUserAvatar>
  );
}

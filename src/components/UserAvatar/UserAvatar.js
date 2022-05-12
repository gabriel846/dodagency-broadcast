// Packages
import React from "react";

// Stylings
import { StyledUserAvatar } from "./UserAvatar.style";

export function UserAvatar(props) {
  const { authenticatedUser, onClick } = props;

  return (
    <StyledUserAvatar onClick={onClick}>
      {authenticatedUser.name.charAt(0)}
    </StyledUserAvatar>
  );
}

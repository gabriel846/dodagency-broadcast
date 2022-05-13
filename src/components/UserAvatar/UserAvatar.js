// Packages
import React from "react";

// Stylings
import { StyledUserAvatar } from "./UserAvatar.style";

export function UserAvatar(props) {
  const { authenticatedUser, onClick } = props;

  const { name } = authenticatedUser;

  return (
    <StyledUserAvatar onClick={onClick}>
      {!!name ? name.charAt(0) : "?"}
    </StyledUserAvatar>
  );
}

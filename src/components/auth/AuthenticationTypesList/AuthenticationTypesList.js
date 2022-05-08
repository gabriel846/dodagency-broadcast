// Packages
import React from "react";

// Stylings
import { StyledAuthenticationTypesList } from "./AuthenticationTypesList.style";

export function AuthenticationTypesList(props) {
  const { children } = props;

  return (
    <StyledAuthenticationTypesList>
      {children}
    </StyledAuthenticationTypesList>
  );
}

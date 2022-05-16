// Packages
import React from "react";

// Hooks
import { useWindowSize } from "../../../hooks";

// Stylings
import { StyledAuthenticationTypesList } from "./AuthenticationTypesList.style";

export function AuthenticationTypesList(props) {
  const { children } = props;
  const [viewportWidth] = useWindowSize();

  return (
    <StyledAuthenticationTypesList vertical={viewportWidth < 768}>
      {children}
    </StyledAuthenticationTypesList>
  );
}

// Packages
import React from "react";

// Stylings
import { StyledAuthenticationType } from "./AuthenticationType.style";

export function AuthenticationType(props) {
  const { active, authenticationType, onClick } = props;

  const formattedAuthenticationType = authenticationType.replaceAll("_", " ");

  return (
    <StyledAuthenticationType active={active} onClick={onClick}>
      {formattedAuthenticationType}
    </StyledAuthenticationType>
  );
}

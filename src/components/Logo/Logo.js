// Packages
import React from "react";

// Theme
import { APP_NAME } from "../../environment/theme/Variables";

// Stylings
import {
  StyledBookIcon,
  StyledLogo,
  StyledLogoName,
  StyledMovieIcon,
} from "./Logo.style";

export function Logo() {
  return (
    <StyledLogo>
      <StyledMovieIcon />
      <StyledLogoName>{APP_NAME}</StyledLogoName>
      <StyledBookIcon />
    </StyledLogo>
  );
}

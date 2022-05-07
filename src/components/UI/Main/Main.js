// Packages
import React from "react";

// Stylings
import { StyledMain } from "./Main.style";

export function Main(props) {
  const { centeredMainAxis, children } = props;

  return (
    <StyledMain centeredMainAxis={centeredMainAxis}>{children}</StyledMain>
  );
}

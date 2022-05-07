// Packages
import React from "react";

// Stylings
import { StyledMain } from "./Main.style";

export function Main(props) {
  const { centeredMainAxis, children, vertical } = props;

  return (
    <StyledMain centeredMainAxis={centeredMainAxis} vertical={vertical}>
      {children}
    </StyledMain>
  );
}

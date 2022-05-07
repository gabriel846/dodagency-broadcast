// Packages
import React from "react";

// Stylings
import { StyledNavLink } from "./NavLink.style";

export function NavLink(props) {
  const { active, children, onClick, style } = props;

  return (
    <StyledNavLink.Link active={active} onClick={onClick} style={style}>
      {children}
    </StyledNavLink.Link>
  );
}

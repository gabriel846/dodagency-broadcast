// Packages
import { Navbar } from "react-bootstrap";
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledNavbar = styled(Navbar)`
  background-color: ${COLORS.SECONDARY};
  user-select: none;
`;

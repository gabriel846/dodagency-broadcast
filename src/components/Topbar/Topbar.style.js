// Packages
import { Navbar } from "react-bootstrap";
import { MdClose, MdMenu } from "react-icons/md";
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledHamburgerIconClosed = styled(MdMenu)`
  color: ${COLORS.PRIMARY};
  font-size: ${(props) => (props.size ? props.size : "xx-large")};
`;

export const StyledHamburgerIconOpen = styled(MdClose)`
  color: ${COLORS.PRIMARY};
  font-size: ${(props) => (props.size ? props.size : "xx-large")};
`;

export const StyledNavbar = styled(Navbar)`
  background-color: ${COLORS.SECONDARY};
  user-select: none;
`;

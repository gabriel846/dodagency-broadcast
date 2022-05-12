// Packages
import { Nav } from "react-bootstrap";
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledNavLink = styled(Nav.Link)`
  align-items: center;
  color: ${(props) =>
    props.active ? `${COLORS.QUATERNARY}` : `${COLORS.PRIMARY}`} !important;
  display: flex;
  font-size: large;
  justify-content: center;
`;

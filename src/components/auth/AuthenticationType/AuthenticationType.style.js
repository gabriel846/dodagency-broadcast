// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledAuthenticationType = styled.li`
  align-items: center;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.SECONDARY};
  isplay: flex;
  flex: 1;
  font-weight: bold;
  justify-content: center;
  padding: 1em;
  text-align: center;
  user-select: none;
  ${(props) =>
    props.active &&
    `background-color: ${COLORS.SECONDARY} !important; color: ${COLORS.PRIMARY} !important`};
`;

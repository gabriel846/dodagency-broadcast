// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledMain = styled.main`
  ${(props) => props.centeredMainAxis && "justify-content: center;"};
  background-color: ${COLORS.PRIMARY};
  display: flex;
  flex: 1;
  ${(props) => props.vertical && "flex-direction: column;"};
  padding: 5em;
`;

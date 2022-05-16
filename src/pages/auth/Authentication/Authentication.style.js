// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledAuthenticationContainer = styled.div`
  border: 0.25em solid ${COLORS.SECONDARY};
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: ${(props) => (props.noMargin ? 0 : "5em")};
  padding: 1em;
`;

export const StyledInputErrorMessage = styled.p`
  color: ${COLORS.QUATERNARY};
  margin: 0;
`;

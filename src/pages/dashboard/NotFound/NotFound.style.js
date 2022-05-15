// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledNotFoundContainer = styled.div`
  align-items: center;
  border: 0.25em solid ${COLORS.SECONDARY};
  color: ${COLORS.SECONDARY};
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  padding: 1em;
`;

// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledUserAvatar = styled.div`
  align-items: center;
  aspect-ratio: 1/1;
  background-color: ${COLORS.PRIMARY};
  border-radius: 50%;
  color: ${COLORS.SECONDARY};
  display: flex;
  font-size: medium;
  justify-content: center;
  transition: 0.6s ease;
  user-select: none;
  width: 2em;

  &:hover {
    background-color: ${COLORS.TERTIARY};
    color: ${COLORS.PRIMARY};
  }
`;

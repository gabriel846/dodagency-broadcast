// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledUserProfileContainer = styled.div`
  ${(props) => props.centeredCrossAxis && "align-items: center;"};
  color: ${COLORS.SECONDARY};
  display: flex;
  ${(props) => props.bordered && `border: 0.25em solid ${COLORS.SECONDARY};`};
  ${(props) => props.vertical && "flex-direction: column;"};
  ${(props) => props.verticalReversed && "flex-direction: column-reverse;"};
  gap: 1em;
  ${(props) => props.alignedTopMainAxis && "justify-content: flex-start;"};
  ${(props) => props.centeredMainAxis && "justify-content: center;"};
  padding: ${(props) => (props.noPadding ? "0px" : "1em")};
`;

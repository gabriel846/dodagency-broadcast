// Packages
import styled from "styled-components";

export const StyledCommentInput = styled.textarea`
  font-size: medium;
  padding: 0.5em;

  &::placeholder {
    ${(props) => props.placeholderColor && `color: ${props.placeholderColor}`};
  }
`;

// Packages
import styled from "styled-components";

export const StyledCommentInput = styled.textarea`
  font-size: medium;
  padding: 0.5em;
  resize: none;

  &::placeholder {
    ${(props) => props.placeholderColor && `color: ${props.placeholderColor}`};
  }
`;

// Packages
import styled from "styled-components";

export const StyledBaseInput = styled.input`
  ${(props) => props.cursorColor && `caret-color: ${props.cursorColor}`};
  font-size: medium;
  padding: 1em 0.5em;

  &::placeholder {
    ${(props) => props.placeholderColor && `color: ${props.placeholderColor}`};
  }
`;

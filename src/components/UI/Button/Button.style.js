// Packages
import styled from "styled-components";

export const StyledButton = styled.button`
  ${(props) => props.visible === false && "visibility: hidden;"};
`;

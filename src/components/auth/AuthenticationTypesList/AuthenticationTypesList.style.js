// Packages
import styled from "styled-components";

export const StyledAuthenticationTypesList = styled.ul`
  display: flex;
  ${(props) => props.vertical && "flex-direction: column;"};
  list-style-type: none;
  margin-bottom: 1em;
  padding: 0;
`;

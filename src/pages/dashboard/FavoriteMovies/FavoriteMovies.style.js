// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledFavoriteMoviesContainer = styled.div`
  ${(props) => props.isEmpty && `border: 0.25em solid ${COLORS.SECONDARY};`};
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.isEmpty ? "1em" : "5em")};
  padding: 1em;
`;

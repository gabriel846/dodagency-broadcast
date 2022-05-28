// Packages
import { MdMenuBook, MdMovie } from "react-icons/md";
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledBookIcon = styled(MdMenuBook)`
  font-size: x-large;
  margin-left: 0.125em;
`;

export const StyledLogo = styled.div`
  align-items: center;
  color: ${COLORS.PRIMARY};
  display: flex;
  transition: 0.6s ease;
`;

export const StyledLogoName = styled.span`
  font-size: x-large;
  font-weight: 500;
  margin: 0 0.125em;
`;

export const StyledMovieIcon = styled(MdMovie)`
  font-size: x-large;
  margin-right: 0.125em;
`;

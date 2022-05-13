// Packages
import { MdArrowBack } from "react-icons/md";
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledMovieDetailsContainer = styled.div`
  border: 0.25em solid ${COLORS.SECONDARY};
  color: ${COLORS.SECONDARY};
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
`;

export const StyledMovieDetailsGoBack = styled(MdArrowBack)`
  font-size: xx-large;
`;

export const StyledMovieDetailsSectionTitle = styled.h3`
  margin-bottom: 0.5em;
`;

export const StyledMovieImage = styled.img`
  border: 0.25em solid ${COLORS.SECONDARY};
  max-width: 100%;
`;

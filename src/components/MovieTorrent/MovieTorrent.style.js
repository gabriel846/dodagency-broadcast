// Packages
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledMovieTorrent = styled.li`
  border: 0.25em solid ${COLORS.SECONDARY};
  list-style-type: none;
  padding: 1em;
  user-select: none;
`;

export const StyledMovieTorrentDownloadButton = styled.button`
  background-color: ${COLORS.SECONDARY};
  padding: 0.5em 1em;
`;

export const StyledMovieTorrentDownloadButtonLink = styled.a`
  color: ${COLORS.PRIMARY};
  font-weight: bold;
  text-decoration: none;
`;

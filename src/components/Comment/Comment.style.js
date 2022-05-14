// Packages
import { MdDelete } from "react-icons/md";
import styled from "styled-components";

// Theme
import COLORS from "../../environment/theme/Colors";

export const StyledComment = styled.li`
  align-items: flex-start;
  display: flex;
  gap: 1em;
  list-style-type: none;
`;

export const StyledCommentDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const StyledDeleteCommentIcon = styled(MdDelete)`
  color: ${COLORS.QUATERNARY};
  font-size: xx-large;
`;

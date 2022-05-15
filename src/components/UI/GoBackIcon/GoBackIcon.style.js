// Packages
import { MdArrowBack } from "react-icons/md";
import styled from "styled-components";

// Theme
import COLORS from "../../../environment/theme/Colors";

export const StyledGoBackIcon = styled(MdArrowBack)`
  color: ${COLORS.SECONDARY};
  font-size: ${(props) => (props.size ? props.size : "xx-large")};
`;

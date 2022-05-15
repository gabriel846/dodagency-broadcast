// Packages
import styled from "styled-components";

export const StyledUserAvatar = styled.div`
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  font-size: ${(props) => (props.textSize ? props.textSize : "medium")};
  justify-content: center;
  user-select: none;
  width: ${(props) => (props.size ? props.size : "2em")};
`;

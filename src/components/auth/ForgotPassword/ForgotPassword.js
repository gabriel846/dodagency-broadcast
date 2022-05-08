// Packages
import React from "react";

// Components
import { Button } from "../../UI/Button";
import { Input } from "../../Input";

// Theme
import COLORS from "../../../environment/theme/Colors";
import {
  AUTHENTICATION_BUTTON_STYLE,
  AUTHENTICATION_INPUT_STYLE,
} from "../../../environment/theme/Variables";

// Stylings
import { StyledForgotPasswordContainer } from "./ForgotPassword.style";

export function ForgotPassword(props) {
  const { onClick } = props;

  return (
    <StyledForgotPasswordContainer>
      <Input
        cursorColor={COLORS.SECONDARY}
        placeholder="Email"
        placeholderColor={COLORS.SECONDARY}
        style={AUTHENTICATION_INPUT_STYLE}
        type="email"
      />
      <Button
        onClick={onClick}
        style={AUTHENTICATION_BUTTON_STYLE}
        text="Reset password"
      />
    </StyledForgotPasswordContainer>
  );
}

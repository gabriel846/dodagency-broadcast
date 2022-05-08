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
import { StyledLoginContainer } from "./Login.style";

export function Login(props) {
  const { onClick, redirectToForgotPassword, redirectToRegister } = props;

  return (
    <StyledLoginContainer>
      <Input
        cursorColor={COLORS.SECONDARY}
        placeholder="Email"
        placeholderColor={COLORS.SECONDARY}
        style={AUTHENTICATION_INPUT_STYLE}
        type="email"
      />
      <Input
        cursorColor={COLORS.SECONDARY}
        placeholder="Password"
        placeholderColor={COLORS.SECONDARY}
        style={AUTHENTICATION_INPUT_STYLE}
        type="password"
      />
      <Button
        onClick={onClick}
        style={AUTHENTICATION_BUTTON_STYLE}
        text="Log in"
      />
    </StyledLoginContainer>
  );
}

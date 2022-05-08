// Packages
import React, { useState } from "react";

// Components
import { AuthenticationType } from "../AuthenticationType/AuthenticationType";
import { AuthenticationTypesList } from "../AuthenticationTypesList";
import { ForgotPassword } from "../../../components/auth/ForgotPassword/ForgotPassword";
import { Login } from "../../../components/auth/Login/Login";
import { Register } from "../../../components/auth/Register/Register";

// Theme
import { AUTHENTICATION_TYPES_LIST } from "../../../environment/theme/Variables";

// Stylings
import { StyledAuthenticationContainer } from "./Authentication.style";

export function Authentication() {
  const [authenticationType, setAuthenticationType] = useState("LOGIN");

  const renderedComponent =
    authenticationType === `LOGIN` ? (
      <Login
        redirectToForgotPassword={() =>
          switchAuthenticationType("FORGOT_PASSWORD")
        }
        redirectToRegister={() => switchAuthenticationType("REGISTER")}
      />
    ) : authenticationType === `REGISTER` ? (
      <Register
        redirectToLoginHandler={() => switchAuthenticationType("LOGIN")}
      />
    ) : (
      <ForgotPassword
        redirectToLoginHandler={() => switchAuthenticationType("LOGIN")}
      />
    );

  const switchAuthenticationType = (newAuthenticationType) => {
    if (authenticationType !== newAuthenticationType) {
      setAuthenticationType(newAuthenticationType);
    }
  };

  return (
    <StyledAuthenticationContainer>
      <AuthenticationTypesList>
        {AUTHENTICATION_TYPES_LIST.map((type, index) => (
          <AuthenticationType
            active={type === authenticationType}
            authenticationType={type}
            key={index}
            onClick={() => switchAuthenticationType(type)}
          />
        ))}
      </AuthenticationTypesList>
      {renderedComponent}
    </StyledAuthenticationContainer>
  );
}

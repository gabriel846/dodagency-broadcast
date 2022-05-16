// Packages
import React, { useState } from "react";

// Hooks
import { useWindowSize } from "../../../hooks";

// Components
import { AuthenticationType } from "../../../components/auth/AuthenticationType";
import { AuthenticationTypesList } from "../../../components/auth/AuthenticationTypesList";
import { ForgotPassword } from "../../../components/auth/ForgotPassword/ForgotPassword";
import { GoBackIcon } from "../../../components/UI/GoBackIcon";
import { Login } from "../../../components/auth/Login/Login";
import { Register } from "../../../components/auth/Register/Register";

// Theme
import { AUTHENTICATION_TYPES_LIST } from "../../../environment/theme/Variables";

// Stylings
import { StyledAuthenticationContainer } from "./Authentication.style";

export function Authentication() {
  const [authenticationType, setAuthenticationType] = useState("LOGIN");
  const [viewportWidth] = useWindowSize();

  const renderedComponent =
    authenticationType === `LOGIN` ? (
      <Login />
    ) : authenticationType === `REGISTER` ? (
      <Register onSuccess={() => switchAuthenticationType("LOGIN")} />
    ) : (
      <ForgotPassword onSuccess={() => switchAuthenticationType("LOGIN")} />
    );

  const switchAuthenticationType = (newAuthenticationType) => {
    if (authenticationType !== newAuthenticationType) {
      setAuthenticationType(newAuthenticationType);
    }
  };

  return (
    <StyledAuthenticationContainer noMargin={viewportWidth < 768}>
      <GoBackIcon />
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

// Packages
import { Formik } from "formik";
import React from "react";

// Components
import { Button } from "../../UI/Button";
import { BaseInput } from "../../Input";

// Theme
import COLORS from "../../../environment/theme/Colors";
import {
  AUTHENTICATION_BUTTON_STYLE,
  AUTHENTICATION_INPUT_STYLE,
} from "../../../environment/theme/Variables";
import { resetPassword } from "../../../environment/firebase/firebase-methods";

// Stylings
import { StyledInputErrorMessage } from "../../../pages/auth/Authentication/Authentication.style";
import { StyledForgotPasswordContainer } from "./ForgotPassword.style";

// Validation
import { forgotPasswordValidationSchema } from "../../../validation";

export function ForgotPassword(props) {
  const { onSuccess } = props;

  const INITIAL_FORM_VALUES = { email: "" };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      onSubmit={(values) =>
        resetPassword({ email: values.email, onSuccess: () => onSuccess() })
      }
      validationSchema={forgotPasswordValidationSchema}
    >
      {(formikProps) => (
        <StyledForgotPasswordContainer>
          {formikProps.touched.email && formikProps.errors.email && (
            <StyledInputErrorMessage>
              {formikProps.errors.email}
            </StyledInputErrorMessage>
          )}
          <BaseInput
            cursorColor={COLORS.SECONDARY}
            onBlur={formikProps.handleBlur("email")}
            onChange={formikProps.handleChange("email")}
            placeholder="Email"
            placeholderColor={COLORS.SECONDARY}
            style={AUTHENTICATION_INPUT_STYLE}
            type="email"
            value={formikProps.values.email}
          />
          <Button
            onClick={formikProps.handleSubmit}
            style={AUTHENTICATION_BUTTON_STYLE}
            text="Reset password"
            type="submit"
          />
        </StyledForgotPasswordContainer>
      )}
    </Formik>
  );
}

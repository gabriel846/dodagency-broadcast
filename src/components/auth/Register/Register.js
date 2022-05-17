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
import { registerUser } from "../../../environment/firebase/firebase-methods";

// Stylings
import { StyledInputErrorMessage } from "../../../pages/auth/Authentication/Authentication.style";
import { StyledRegisterContainer } from "./Register.style";

// Validation
import { registerValidationSchema } from "../../../validation";

export function Register(props) {
  const { onSuccess } = props;

  const INITIAL_FORM_VALUES = { email: "", name: "", password: "" };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      onSubmit={(values) =>
        registerUser(values.email, values.name, values.password, () =>
          onSuccess()
        )
      }
      validationSchema={registerValidationSchema}
    >
      {(formikProps) => (
        <StyledRegisterContainer>
          {formikProps.touched.name && formikProps.errors.name && (
            <StyledInputErrorMessage>
              {formikProps.errors.name}
            </StyledInputErrorMessage>
          )}
          <BaseInput
            cursorColor={COLORS.SECONDARY}
            onBlur={formikProps.handleBlur("name")}
            onChange={formikProps.handleChange("name")}
            placeholder="Name"
            placeholderColor={COLORS.SECONDARY}
            style={AUTHENTICATION_INPUT_STYLE}
            type="text"
            value={formikProps.values.name}
          />
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
          {formikProps.touched.password && formikProps.errors.password && (
            <StyledInputErrorMessage>
              {formikProps.errors.password}
            </StyledInputErrorMessage>
          )}
          <BaseInput
            cursorColor={COLORS.SECONDARY}
            onBlur={formikProps.handleBlur("password")}
            onChange={formikProps.handleChange("password")}
            placeholder="Password"
            placeholderColor={COLORS.SECONDARY}
            style={AUTHENTICATION_INPUT_STYLE}
            type="password"
            value={formikProps.values.password}
          />
          <Button
            onClick={formikProps.handleSubmit}
            style={AUTHENTICATION_BUTTON_STYLE}
            text="Register"
            type="submit"
          />
        </StyledRegisterContainer>
      )}
    </Formik>
  );
}

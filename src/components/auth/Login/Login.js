// Packages
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Components
import { Button } from "../../UI/Button";
import { BaseInput } from "../../Input";

// Theme
import COLORS from "../../../environment/theme/Colors";
import {
  AUTHENTICATION_BUTTON_STYLE,
  AUTHENTICATION_INPUT_STYLE,
} from "../../../environment/theme/Variables";
import {
  authenticateUser,
  authenticateUserWithGoogle,
} from "../../../environment/firebase/firebase-methods";

// Stylings
import { StyledInputErrorMessage } from "../../../pages/auth/Authentication/Authentication.style";
import { StyledLoginContainer } from "./Login.style";

// Validation
import { loginValidationSchema } from "../../../validation";

export function Login(props) {
  const INITIAL_FORM_VALUES = { email: "", password: "" };

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        onSubmit={(values) => {
          const { email, password } = values;

          authenticateUser(dispatch, email, password, () => history.goBack());
        }}
        validationSchema={loginValidationSchema}
      >
        {(formikProps) => (
          <StyledLoginContainer>
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
              text="Log in"
              type="submit"
            />
          </StyledLoginContainer>
        )}
      </Formik>
      <Button
        onClick={() =>
          authenticateUserWithGoogle(dispatch, () => history.goBack())
        }
        style={AUTHENTICATION_BUTTON_STYLE}
        text="Log in with Google"
      />
    </>
  );
}

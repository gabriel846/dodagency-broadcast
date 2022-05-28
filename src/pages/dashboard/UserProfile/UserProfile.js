// Packages
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux slices
import { authActions } from "../../../store/auth/auth-slice";

// Hooks
import { useWindowSize } from "../../../hooks";

// Components
import { BaseInput } from "../../../components/Input";
import { Button } from "../../../components/UI/Button";
import { GoBackIcon } from "../../../components/UI/GoBackIcon/GoBackIcon";
import { UserAvatar } from "../../../components/UserAvatar/UserAvatar";

// Theme
import COLORS from "../../../environment/theme/Colors";
import {
  deleteUserAccount,
  deleteUserAccountWithGoogle,
  updateUserEmail,
  updateUserEmailWithGoogle,
  updateUserName,
  updateUserPassword,
} from "../../../environment/firebase/firebase-methods";
import {
  AUTHENTICATION_BUTTON_STYLE,
  AUTHENTICATION_INPUT_STYLE,
  DELETE_ACCOUNT_BUTTON_STYLE,
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_MESSAGE,
  EMAIL_UPDATED_SUCCESSFULLY_MESSAGE,
  EMAIL_VERIFICATION_LINK_ERROR,
  NAME_UPDATED_SUCCESSFULLY_MESSAGE,
  PASSWORD_UPDATE_ERROR,
  PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE,
  REAUTHENTICATION_ERROR,
  UPDATE_DATABASE_ERROR,
  UPDATE_EMAIL_ERROR,
} from "../../../environment/theme/Variables";

// Stylings
import { StyledUserProfileContainer } from "./UserProfile.style";
import { StyledInputErrorMessage } from "../../auth/Authentication/Authentication.style";

// Validation
import {
  userProfileDeleteAccountWithPasswordValidationSchema,
  userProfileUpdateEmailWithGoogleValidationSchema,
  userProfileUpdateEmailWithPasswordValidationSchema,
  userProfileUpdateNameValidationSchema,
  userProfileUpdatePasswordValidationSchema,
} from "../../../validation/user-profile";

export function UserProfile() {
  const [viewportWidth] = useWindowSize();
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const userHasGoogleAuthenticationProvider =
    Object.values(authenticatedUser.providers).filter(
      (provider) => provider.providerId === "google.com"
    ).length > 0;
  const userHasPasswordAuthenticationProvider =
    Object.values(authenticatedUser.providers).filter(
      (provider) => provider.providerId === "password"
    ).length > 0;

  const INITIAL_FORM_VALUES = {
    DELETE_ACCOUNT: { password: "" },
    UPDATE_EMAIL_WITH_GOOGLE: { email: "" },
    UPDATE_EMAIL_WITH_PASSWORD: {
      email: authenticatedUser.email,
      password: "",
    },
    UPDATE_NAME: { name: authenticatedUser.name },
    UPDATE_PASSWORD: { newPassword: "", password: "" },
  };

  return (
    <StyledUserProfileContainer vertical>
      <div style={{ padding: "0 1em" }}>
        <GoBackIcon />
      </div>
      <StyledUserProfileContainer
        centeredMainAxis
        vertical={viewportWidth < 1200}
        verticalReversed={viewportWidth < 1200}
      >
        <StyledUserProfileContainer
          noPadding
          vertical
          style={{
            flex: 1,
          }}
        >
          {!!authenticatedUser.providers &&
            !!userHasGoogleAuthenticationProvider &&
            !!!userHasPasswordAuthenticationProvider && (
              <Formik
                initialValues={INITIAL_FORM_VALUES.UPDATE_EMAIL_WITH_GOOGLE}
                onSubmit={(values) =>
                  updateUserEmailWithGoogle({
                    newEmail: values.email,
                    onReauthenticationError: () =>
                      alert(REAUTHENTICATION_ERROR),
                    onSendEmailVerificationError: () =>
                      alert(EMAIL_VERIFICATION_LINK_ERROR),
                    onSuccess: () => alert(EMAIL_UPDATED_SUCCESSFULLY_MESSAGE),
                    onUpdateDatabaseError: () => alert(UPDATE_DATABASE_ERROR),
                    onUpdateEmailError: () => alert(UPDATE_EMAIL_ERROR),
                  })
                }
                validationSchema={
                  userProfileUpdateEmailWithGoogleValidationSchema
                }
              >
                {(formikProps) => (
                  <StyledUserProfileContainer
                    bordered
                    centeredCrossAxis
                    centeredMainAxis
                    vertical
                  >
                    {formikProps.touched.email && formikProps.errors.email && (
                      <StyledInputErrorMessage style={{ width: "100%" }}>
                        {formikProps.errors.email}
                      </StyledInputErrorMessage>
                    )}
                    <BaseInput
                      cursorColor={COLORS.SECONDARY}
                      onBlur={formikProps.handleBlur("email")}
                      onChange={formikProps.handleChange("email")}
                      placeholder="Email"
                      placeholderColor={COLORS.SECONDARY}
                      style={{
                        ...AUTHENTICATION_INPUT_STYLE,
                        ...{ width: "100%" },
                      }}
                      type="email"
                      value={formikProps.values.email}
                    />
                    <Button
                      onClick={formikProps.handleSubmit}
                      style={AUTHENTICATION_BUTTON_STYLE}
                      text="Update email with Google"
                      type="submit"
                    />
                  </StyledUserProfileContainer>
                )}
              </Formik>
            )}
          {!!authenticatedUser.providers &&
            userHasPasswordAuthenticationProvider && (
              <Formik
                initialValues={INITIAL_FORM_VALUES.UPDATE_EMAIL_WITH_PASSWORD}
                onSubmit={(values) => {
                  updateUserEmail({
                    newEmail: values.email,
                    password: values.password,
                    onReauthenticationError: () =>
                      alert(REAUTHENTICATION_ERROR),
                    onSendEmailVerificationError: () =>
                      alert(EMAIL_VERIFICATION_LINK_ERROR),
                    onSuccess: () => alert(EMAIL_UPDATED_SUCCESSFULLY_MESSAGE),
                    onUpdateDatabaseError: () => alert(UPDATE_DATABASE_ERROR),
                    onUpdateEmailError: () => alert(UPDATE_EMAIL_ERROR),
                  });
                }}
                validationSchema={
                  userProfileUpdateEmailWithPasswordValidationSchema
                }
              >
                {(formikProps) => (
                  <StyledUserProfileContainer
                    bordered
                    centeredCrossAxis
                    centeredMainAxis
                    vertical
                  >
                    {formikProps.touched.email && formikProps.errors.email && (
                      <StyledInputErrorMessage style={{ width: "100%" }}>
                        {formikProps.errors.email}
                      </StyledInputErrorMessage>
                    )}
                    <BaseInput
                      cursorColor={COLORS.SECONDARY}
                      onBlur={formikProps.handleBlur("email")}
                      onChange={formikProps.handleChange("email")}
                      placeholder="Email"
                      placeholderColor={COLORS.SECONDARY}
                      style={{
                        ...AUTHENTICATION_INPUT_STYLE,
                        ...{ width: "100%" },
                      }}
                      type="email"
                      value={formikProps.values.email}
                    />
                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <StyledInputErrorMessage style={{ width: "100%" }}>
                          {formikProps.errors.password}
                        </StyledInputErrorMessage>
                      )}
                    <BaseInput
                      cursorColor={COLORS.SECONDARY}
                      onBlur={formikProps.handleBlur("password")}
                      onChange={formikProps.handleChange("password")}
                      placeholder="Password"
                      placeholderColor={COLORS.SECONDARY}
                      style={{
                        ...AUTHENTICATION_INPUT_STYLE,
                        ...{ width: "100%" },
                      }}
                      type="password"
                      value={formikProps.values.password}
                    />
                    <Button
                      onClick={formikProps.handleSubmit}
                      style={AUTHENTICATION_BUTTON_STYLE}
                      text="Update email"
                      type="submit"
                    />
                  </StyledUserProfileContainer>
                )}
              </Formik>
            )}
          <Formik
            initialValues={INITIAL_FORM_VALUES.UPDATE_NAME}
            onSubmit={(values) =>
              updateUserName({
                newName: values.name,
                onSuccess: () => alert(NAME_UPDATED_SUCCESSFULLY_MESSAGE),
                onUpdateDatabaseError: () => alert(UPDATE_DATABASE_ERROR),
              })
            }
            validationSchema={userProfileUpdateNameValidationSchema}
          >
            {(formikProps) => (
              <StyledUserProfileContainer
                bordered
                centeredCrossAxis
                centeredMainAxis
                vertical
              >
                {formikProps.touched.name && formikProps.errors.name && (
                  <StyledInputErrorMessage style={{ width: "100%" }}>
                    {formikProps.errors.name}
                  </StyledInputErrorMessage>
                )}
                <BaseInput
                  cursorColor={COLORS.SECONDARY}
                  onBlur={formikProps.handleBlur("name")}
                  onChange={formikProps.handleChange("name")}
                  placeholder="Name"
                  placeholderColor={COLORS.SECONDARY}
                  style={{
                    ...AUTHENTICATION_INPUT_STYLE,
                    ...{ width: "100%" },
                  }}
                  type="text"
                  value={formikProps.values.name}
                />
                <Button
                  onClick={formikProps.handleSubmit}
                  style={AUTHENTICATION_BUTTON_STYLE}
                  text="Update name"
                  type="submit"
                />
              </StyledUserProfileContainer>
            )}
          </Formik>
          {!!authenticatedUser.providers &&
            userHasPasswordAuthenticationProvider && (
              <Formik
                initialValues={INITIAL_FORM_VALUES.UPDATE_PASSWORD}
                onSubmit={(values) => {
                  updateUserPassword({
                    password: values.password,
                    newPassword: values.newPassword,
                    onReauthenticationError: () =>
                      alert(REAUTHENTICATION_ERROR),
                    onSuccess: () =>
                      alert(PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE),
                    onUpdatePasswordError: () => alert(PASSWORD_UPDATE_ERROR),
                  });
                }}
                validationSchema={userProfileUpdatePasswordValidationSchema}
              >
                {(formikProps) => (
                  <StyledUserProfileContainer
                    bordered
                    centeredCrossAxis
                    centeredMainAxis
                    vertical
                  >
                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <StyledInputErrorMessage style={{ width: "100%" }}>
                          {formikProps.errors.password}
                        </StyledInputErrorMessage>
                      )}
                    <BaseInput
                      cursorColor={COLORS.SECONDARY}
                      onBlur={formikProps.handleBlur("password")}
                      onChange={formikProps.handleChange("password")}
                      placeholder="Password"
                      placeholderColor={COLORS.SECONDARY}
                      style={{
                        ...AUTHENTICATION_INPUT_STYLE,
                        ...{ width: "100%" },
                      }}
                      type="password"
                      value={formikProps.values.password}
                    />
                    {formikProps.touched.newPassword &&
                      formikProps.errors.newPassword && (
                        <StyledInputErrorMessage style={{ width: "100%" }}>
                          {formikProps.errors.newPassword}
                        </StyledInputErrorMessage>
                      )}
                    <BaseInput
                      cursorColor={COLORS.SECONDARY}
                      onBlur={formikProps.handleBlur("newPassword")}
                      onChange={formikProps.handleChange("newPassword")}
                      placeholder="New password"
                      placeholderColor={COLORS.SECONDARY}
                      style={{
                        ...AUTHENTICATION_INPUT_STYLE,
                        ...{ width: "100%" },
                      }}
                      type="password"
                      value={formikProps.values.newPassword}
                    />
                    <Button
                      onClick={formikProps.handleSubmit}
                      style={AUTHENTICATION_BUTTON_STYLE}
                      text="Update password"
                      type="submit"
                    />
                  </StyledUserProfileContainer>
                )}
              </Formik>
            )}
          {!!authenticatedUser.providers &&
            userHasPasswordAuthenticationProvider && (
              <Formik
                initialValues={INITIAL_FORM_VALUES.DELETE_ACCOUNT}
                onSubmit={(values) =>
                  deleteUserAccount({
                    password: values.password,
                    onDeleteUserError: () => alert(DELETE_ACCOUNT_ERROR),
                    onReauthenticationError: () =>
                      alert(REAUTHENTICATION_ERROR),
                    onSuccess: () => {
                      history.goBack();
                      dispatch(authActions.clearAuthenticatedUser());
                      alert(DELETE_ACCOUNT_MESSAGE);
                    },
                    onUpdateDatabaseError: () => alert(UPDATE_DATABASE_ERROR),
                  })
                }
                validationSchema={
                  userProfileDeleteAccountWithPasswordValidationSchema
                }
              >
                {(formikProps) => (
                  <StyledUserProfileContainer
                    bordered
                    centeredCrossAxis
                    centeredMainAxis
                    vertical
                  >
                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <StyledInputErrorMessage style={{ width: "100%" }}>
                          {formikProps.errors.password}
                        </StyledInputErrorMessage>
                      )}
                    <BaseInput
                      cursorColor={COLORS.SECONDARY}
                      onBlur={formikProps.handleBlur("password")}
                      onChange={formikProps.handleChange("password")}
                      placeholder="Password"
                      placeholderColor={COLORS.SECONDARY}
                      style={{
                        ...AUTHENTICATION_INPUT_STYLE,
                        ...{ width: "100%" },
                      }}
                      type="password"
                      value={formikProps.values.password}
                    />
                    <Button
                      onClick={formikProps.handleSubmit}
                      style={DELETE_ACCOUNT_BUTTON_STYLE}
                      text="Delete account"
                      type="submit"
                    />
                  </StyledUserProfileContainer>
                )}
              </Formik>
            )}
          {!!authenticatedUser.providers &&
            userHasGoogleAuthenticationProvider && (
              <StyledUserProfileContainer bordered>
                <Button
                  onClick={() =>
                    deleteUserAccountWithGoogle({
                      onDeleteUserError: () => alert(DELETE_ACCOUNT_ERROR),
                      onReauthenticationError: () =>
                        alert(REAUTHENTICATION_ERROR),
                      onSuccess: () => {
                        history.goBack();
                        dispatch(authActions.clearAuthenticatedUser());
                        alert(DELETE_ACCOUNT_MESSAGE);
                      },
                      onUpdateDatabaseError: () => alert(UPDATE_DATABASE_ERROR),
                    })
                  }
                  style={DELETE_ACCOUNT_BUTTON_STYLE}
                  text="Delete account with Google"
                  type="submit"
                />
              </StyledUserProfileContainer>
            )}
        </StyledUserProfileContainer>
        <StyledUserProfileContainer
          bordered
          centeredCrossAxis
          centeredMainAxis
          vertical
          style={{ flex: 1 }}
        >
          <UserAvatar
            size="4em"
            style={{ backgroundColor: COLORS.SECONDARY, color: COLORS.PRIMARY }}
            textSize="large"
            user={authenticatedUser}
          />
          <p style={{ fontSize: "x-large", margin: 0 }}>
            {authenticatedUser.email}
          </p>
          <p style={{ fontSize: "x-large", margin: 0 }}>
            {authenticatedUser.name}
          </p>
        </StyledUserProfileContainer>
      </StyledUserProfileContainer>
    </StyledUserProfileContainer>
  );
}

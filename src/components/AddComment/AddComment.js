// Packages
import { Formik } from "formik";
import React from "react";

// Components
import { Button } from "../UI/Button";
import { CommentInput } from "../Input";
import { UserAvatar } from "../UserAvatar/UserAvatar";

// Theme
import COLORS from "../../environment/theme/Colors";
import {
  addMovieComment,
  genereateRandomUUID,
} from "../../environment/theme/Methods";
import {
  ADD_COMMENT_BUTTON_STYLE,
  ADD_COMMENT_INPUT_STYLE,
  USER_AVATAR_MOVIE_COMMENTS_STYLE,
} from "../../environment/theme/Variables";

// Stylings
import {
  StyledAddCommentMainContainer,
  StyledAddCommentMessageContainer,
} from "./AddComment.style";
import { StyledInputErrorMessage } from "../../pages/auth/Authentication/Authentication.style";

// Validation
import { addCommentValidationSchema } from "../../validation/add-comment/add-comment-validation";

export function AddComment(props) {
  const { authenticatedUser, movieID } = props;
  const INITIAL_FORM_VALUES = { message: "" };

  return (
    <StyledAddCommentMainContainer>
      <UserAvatar
        style={USER_AVATAR_MOVIE_COMMENTS_STYLE}
        user={authenticatedUser}
      />
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          addMovieComment({
            date: JSON.parse(JSON.stringify(new Date())),
            id: genereateRandomUUID(),
            message: values.message,
            movieID,
            userID: authenticatedUser.id,
          });
        }}
        validationSchema={addCommentValidationSchema}
      >
        {(formikProps) => (
          <StyledAddCommentMessageContainer>
            {formikProps.touched.message && formikProps.errors.message && (
              <StyledInputErrorMessage>
                {formikProps.errors.message}
              </StyledInputErrorMessage>
            )}
            <CommentInput
              onBlur={formikProps.handleBlur("message")}
              onChange={formikProps.handleChange("message")}
              placeholder="Message"
              placeholderColor={COLORS.SECONDARY}
              style={ADD_COMMENT_INPUT_STYLE}
              value={formikProps.values.message}
            />
            <Button
              onClick={formikProps.handleSubmit}
              style={ADD_COMMENT_BUTTON_STYLE}
              text="Add"
              type="submit"
            />
          </StyledAddCommentMessageContainer>
        )}
      </Formik>
    </StyledAddCommentMainContainer>
  );
}

// Theme
import COLORS from "./Colors";

export const ADD_COMMENT_BUTTON_STYLE = {
  backgroundColor: COLORS.SECONDARY,
  color: COLORS.PRIMARY,
  fontSize: "large",
  fontWeight: "bold",
  padding: "0.25em 0",
};

export const ADD_COMMENT_ERROR = "Couldn't add the comment...";

export const ADD_COMMENT_INPUT_STYLE = {
  backgroundColor: COLORS.PRIMARY,
  border: `0.25em solid ${COLORS.SECONDARY}`,
  color: COLORS.SECONDARY,
  fontSize: "medium",
  outline: "none",
};

export const ADD_MOVIE_TO_FAVORITES_ERROR =
  "Couldn't add the movie to favorites...";

export const APP_NAME = "filmbook";

export const AUTHENTICATION_BUTTON_STYLE = {
  backgroundColor: COLORS.SECONDARY,
  color: COLORS.PRIMARY,
  fontSize: "large",
  fontWeight: "bold",
  padding: "1em 0",
  width: "100%",
};

export const AUTHENTICATION_INPUT_STYLE = {
  backgroundColor: COLORS.PRIMARY,
  border: `0.25em solid ${COLORS.SECONDARY}`,
  color: COLORS.SECONDARY,
  fontSize: "medium",
  fontWeight: "bold",
  outline: "none",
};

export const AUTHENTICATION_PERSISTENCE_ERROR =
  "Couldn't set authentication's persistence...";

export const AUTHENTICATION_TYPES_LIST = [
  "LOGIN",
  "REGISTER",
  "FORGOT_PASSWORD",
];

export const BACK_TO_TOP_BUTTON_STYLE = {
  backgroundColor: COLORS.PRIMARY,
  border: `0.25em solid ${COLORS.SECONDARY}`,
  borderRadius: "0.5em",
  color: COLORS.SECONDARY,
  fontSize: "large",
  fontWeight: "bold",
  padding: "1em 0",
  width: "100%",
};

export const CANCEL_FETCHING_NUMBER_OF_FAVORITE_MOVIES_MESSAGE =
  "Cancelled fetching number of favorite movies";

export const CANCEL_FETCHING_NUMBER_OF_MOVIES_MESSAGE =
  "Cancelled fetching number of movies";

export const DELETE_ACCOUNT_BUTTON_STYLE = {
  backgroundColor: COLORS.QUATERNARY,
  color: COLORS.PRIMARY,
  fontSize: "large",
  fontWeight: "bold",
  padding: "1em 0",
  width: "100%",
};

export const DELETE_ACCOUNT_ERROR = "Couldn't delete the account...";

export const DELETE_ACCOUNT_MESSAGE = "Account successfully deleted";

export const EMAIL_UPDATED_SUCCESSFULLY_MESSAGE = "Email updated successfully";

export const EMAIL_VERIFICATION_LINK_ERROR =
  "Couldn't send the email verification link...";

export const ERROR_CONTAINER_STYLE = {
  alignItems: "center",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "1em",
  justifyContent: "center",
  userSelect: "none",
};

export const ERROR_MESSAGE_STYLE = { color: COLORS.SECONDARY };

export const FAVORITE_MOVIES_NO_DATA_FOUND_BUTTON_STYLE = {
  backgroundColor: COLORS.SECONDARY,
  borderRadius: "0.5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
  width: "fit-content",
};

export const FETCHING_ERROR_MESSAGE =
  "Something went wrong... Please try again!";

export const FETCHING_MOVIE_DETAILS_MESSAGE = "Fetching movie details...";

export const FETCHING_FAVORITE_MOVIES_MESSAGE = "Fetching favorite movies...";

export const GO_BACK_BUTTON_STYLE = {
  backgroundColor: COLORS.SECONDARY,
  borderRadius: "0.5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
  width: "fit-content",
};

export const LOADING_CONTAINER_STYLE = {
  alignItems: "center",
  display: "flex",
  flex: 1,
  justifyContent: "center",
  userSelect: "none",
};

export const LOADING_MESSAGE = "Loading...";

export const LOADING_MESSAGE_STYLE = { color: COLORS.SECONDARY };

export const MOCKED_AUTHENTICATED_USER_ID = "MOCKED_AUTHENTICATED_USER_ID";

export const MOVIE_ADDED_TO_FAVORITES_MESSAGE =
  "The movie was successfully added to favorites";

export const MOVIE_REMOVED_FROM_FAVORITES_MESSAGE =
  "The movie was successfully removed from favorites";

export const MOVIES_LIST_URL_WITH_MOVIE_ID =
  "https://yts.mx/api/v2/movie_details.json?movie_id=";

export const MOVIES_LIST_URL_WITH_PAGE =
  "https://yts.mx/api/v2/list_movies.json?page=";

export const NAME_UPDATED_SUCCESSFULLY_MESSAGE = "Name updated successfully";

export const NEXT_BUTTON_STYLE = {
  backgroundColor: COLORS.TERTIARY,
  borderRadius: "0.5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
};

export const NO_DATA_CONTAINER_STYLE = {
  alignItems: "center",
  display: "flex",
  flex: 1,
  justifyContent: "center",
  userSelect: "none",
};

export const NO_DATA_MESSAGE_STYLE = { color: COLORS.SECONDARY };

export const NO_FILTERED_MOVIES_FOUND =
  "No movie containing the selected genres was found...";

export const NO_MOVIE_COMMENTS_FOUND_BE_THE_FIRST_TO_COMMENT_MESSAGE =
  "Be the first to comment!";

export const NO_MOVIE_COMMENTS_FOUND_MESSAGE = "No comments found";

export const NO_MOVIES_FOUND_MESSAGE = "No data found...";

export const PAGE_NOT_FOUND_BUTTON_STYLE = {
  backgroundColor: COLORS.SECONDARY,
  borderRadius: "0.5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
  width: "fit-content",
};

export const PASSWORD_UPDATE_ERROR = "Couldn't update the password...";

export const PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE =
  "Password updated successfully";

export const PREVIOUS_BUTTON_STYLE = {
  backgroundColor: COLORS.TERTIARY,
  borderRadius: "0.5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
};

export const REAUTHENTICATION_ERROR = "Couldn't reauthenticate...";

export const REMOVE_USER_FROM_FAVORITES_ERROR =
  "Couldn't remove the movie from favorites...";

export const SIGN_IN_ERROR = "Couldn't sign in...";

export const UPDATE_DATABASE_ERROR = "Couldn't update the database...";

export const UPDATE_EMAIL_ERROR = "Couldn't update the email...";

export const USER_AVATAR_MOVIE_COMMENTS_STYLE = {
  backgroundColor: COLORS.SECONDARY,
  color: COLORS.PRIMARY,
};

export const USER_AVATAR_TOPBAR_STYLE = {
  backgroundColor: COLORS.PRIMARY,
  color: COLORS.SECONDARY,
};

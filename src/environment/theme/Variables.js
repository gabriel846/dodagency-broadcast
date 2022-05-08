// Theme
import COLORS from "./Colors";

export const APP_NAME = "DodagencyBroadcast";

export const AUTHENTICATION_TYPES_LIST = [
  `LOGIN`,
  `REGISTER`,
  `FORGOT_PASSWORD`,
];

export const CANCEL_FETCHING_NUMBER_OF_MOVIES_MESSAGE =
  "Cancelled fetching number of movies";

export const LOADING_CONTAINER_STYLE = {
  alignItems: "center",
  display: "flex",
  flex: 1,
  justifyContent: "center",
  userSelect: "none",
};

export const LOADING_MESSAGE = "Loading...";

export const LOADING_MESSAGE_STYLE = { color: COLORS.SECONDARY };

export const MOVIES_LIST_URL_WITH_PAGE =
  "https://yts.mx/api/v2/list_movies.json?page=";

export const NO_DATA_CONTAINER_STYLE = {
  alignItems: "center",
  display: "flex",
  flex: 1,
  justifyContent: "center",
  userSelect: "none",
};

export const NEXT_BUTTON_STYLE = {
  backgroundColor: COLORS.TERTIARY,
  borderRadius: "5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
};

export const NO_DATA_MESSAGE = "No data found...";

export const NO_DATA_MESSAGE_STYLE = { color: COLORS.SECONDARY };

export const PREVIOUS_BUTTON_STYLE = {
  backgroundColor: COLORS.TERTIARY,
  borderRadius: "5em",
  color: COLORS.PRIMARY,
  fontWeight: "bold",
  padding: "1em 2em",
};

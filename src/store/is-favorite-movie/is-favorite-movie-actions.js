// Packages
import { onValue, ref, remove, set } from "firebase/database";

// Redux slices
import { isFavoriteMovieActions } from "./is-favorite-movie-slice";

// Firebase
import { db } from "../../environment/firebase/Firebase";

export const addMovieToFavorites = ({
  userID,
  movieID,
  onFail = () => {},
  onSuccess = () => {},
}) => {
  if (!!!userID) {
    return;
  }

  set(ref(db, `users/${userID}/favoriteMovies/${movieID}`), true)
    .then(() => onSuccess())
    .catch(() => onFail());
};

export const checkIfMovieIsAddedToFavorites = (userID, movieID) => {
  return async (dispatch) => {
    if (!!!userID) {
      return;
    }

    onValue(ref(db, `users/${userID}/favoriteMovies`), (snapshot) => {
      dispatch(isFavoriteMovieActions.resetIsAddedToFavorites());
      dispatch(
        isFavoriteMovieActions.setIsAddedToFavorites({
          isAddedToFavorites: Object.keys(snapshot.val()).includes(
            movieID.toString()
          ),
        })
      );
    });
  };
};

export const removeMovieFromFavorites = ({
  userID,
  movieID,
  onFail = () => {},
  onSuccess = () => {},
}) => {
  if (!!!userID) {
    return;
  }

  remove(ref(db, `users/${userID}/favoriteMovies/${movieID}`))
    .then(() => onSuccess())
    .catch(() => onFail());
};

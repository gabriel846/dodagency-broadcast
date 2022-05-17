// Packages
import axios from "axios";
import { onValue, ref } from "firebase/database";

// Redux actions
import { favoriteMoviesListActions } from "./favorite-movies-list-slice";

// Firebase
import { db } from "../../environment/firebase/Firebase";

// Theme
import { MOVIES_LIST_URL_WITH_MOVIE_ID } from "../../environment/theme/Variables";

export const fetchFavoriteMoviesList = ({ userID }) => {
  return async (dispatch) => {
    const fetchMovieData = async (movieID) => {
      const response = await axios.get(
        `${MOVIES_LIST_URL_WITH_MOVIE_ID}${movieID}`
      );
      const data = await response.data;

      return data;
    };

    try {
      onValue(ref(db, `users/${userID}/favoriteMovies`), (snapshot) => {
        const favoriteMoviesIdList = !!snapshot.val()
          ? Object.keys(snapshot.val())
          : [];

        dispatch(favoriteMoviesListActions.clearFavoriteMoviesList());

        if (favoriteMoviesIdList.length === 0) {
          return;
        }

        favoriteMoviesIdList.forEach((movieID) => {
          fetchMovieData(movieID).then((movieData) =>
            dispatch(
              favoriteMoviesListActions.addFavoriteMovie({
                favoriteMovie: movieData.data.movie,
              })
            )
          );
        });
      });
    } catch (error) {}
  };
};

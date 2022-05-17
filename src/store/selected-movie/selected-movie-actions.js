// Packages
import axios from "axios";

// Redux slices
import { selectedMovieActions } from "./selected-movie-slice";

// Theme
import { MOVIES_LIST_URL_WITH_MOVIE_ID } from "../../environment/theme/Variables";

export const fetchSelectedMovie = (movieID, onFail = () => {}) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `${MOVIES_LIST_URL_WITH_MOVIE_ID}${movieID}`
      );
      const data = await response.data;

      return data;
    };

    try {
      const fetchedData = await fetchData();

      dispatch(
        selectedMovieActions.setSelectedMovie({
          selectedMovie: fetchedData.data.movie,
        })
      );
    } catch (error) {
      onFail();
    }
  };
};

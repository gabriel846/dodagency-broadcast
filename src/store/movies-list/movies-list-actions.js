// Packages
import axios from "axios";

// Redux slice
import { moviesListActions } from "./movies-list-slice";

// Variables
import { MOVIES_LIST_URL } from "../../environment/theme/Variables";

export const fetchMoviesList = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(MOVIES_LIST_URL);

      const data = await response.data;

      return data;
    };

    try {
      const fetchedData = await fetchData();

      const moviesData = fetchedData.data;

      const moviesList = Object.values(moviesData.movies);

      moviesList
        .filter((movie) => movie.title)
        .forEach((movie) => dispatch(moviesListActions.addMovie({ movie })));
    } catch (error) {}
  };
};

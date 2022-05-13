// Packages
import axios from "axios";

// Redux slices
import { moviesListActions } from "./movies-list-slice";

// Theme
import { MOVIES_LIST_URL_WITH_PAGE } from "../../environment/theme/Variables";

export const fetchMoviesList = (page) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(`${MOVIES_LIST_URL_WITH_PAGE}${page}`);

      const data = await response.data;

      return data;
    };

    try {
      const fetchedData = await fetchData();

      const { data: moviesData } = fetchedData;

      const moviesList = Object.values(moviesData.movies);

      moviesList
        .filter((movie) => movie.title)
        .forEach((movie) => dispatch(moviesListActions.addMovie({ movie })));
    } catch (error) {
      console.log(error);
    }
  };
};

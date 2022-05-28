// Packages
import { v4 } from "uuid";

export const arrayContainsAllElementsFrom = (array, target) =>
  target.every((element) => array.includes(element));

export const genereateRandomUUID = () => v4();

export const getMovieGenresList = (moviesList) => {
  let genresList = [];

  moviesList.forEach((movie) => {
    const { genres } = movie;

    if (!!!genres) {
      return;
    }

    genres.forEach((genre) => {
      if (!genresList.includes(genre)) {
        genresList.push(genre);
      }
    });
  });

  return genresList.sort();
};

export const isNotValid = (string) => `${string} is not valid`;

export const isRequired = (string) => `${string} is required`;

export const shouldHaveAtLeastCharacters = ({ string, characters }) =>
  `${string} must be at least ${characters} characters long`;

// Packages
import { ref, set } from "firebase/database";

// Firebase
import { db } from "../firebase/Firebase";

export const createPersonalInformationPath = (personalInformation) => {
  if (personalInformation) {
    const personalInformationRef = ref(
      db,
      `users/${personalInformation.id}/personalInformation`
    );

    set(personalInformationRef, personalInformation);
  }
};

export const getMovieGenresList = (moviesList) => {
  let genresList = [];

  moviesList.forEach((movie) => {
    const { genres } = movie;

    genres.forEach((genre) => {
      if (!genresList.includes(genre)) {
        genresList.push(genre);
      }
    });
  });

  genresList = genresList.sort();

  return genresList;
};

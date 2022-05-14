// Packages
import { ref, set } from "firebase/database";
import { v4 } from "uuid";

// Firebase
import { db } from "../firebase/Firebase";

export const addMovieComment = (comment) => {
  if (!!!comment) {
    return;
  }

  const commentRef = ref(db, `comments/${comment.id}`);

  set(commentRef, comment);
};

export const createPersonalInformationPath = (personalInformation) => {
  if (!!!personalInformation) {
    return;
  }

  const personalInformationRef = ref(
    db,
    `users/${personalInformation.id}/personalInformation`
  );

  set(personalInformationRef, personalInformation);
};

export const genereateRandomUUID = () => {
  return v4();
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

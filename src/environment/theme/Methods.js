// Packages
import { onValue, ref, set } from "firebase/database";
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

// // nu merge la prima randare
// export const getMovieCommentsList = async (movieID) => {
//   const commentsListRef = ref(db, "comments");
//   let commentsList = [];

//   onValue(commentsListRef, (snapshot) => {
//     commentsList = Object.values(snapshot.val()).filter(
//       (comment) => comment.movieID === movieID
//     );

//     // commentsList.forEach((comment) => console.log(comment));
//     // console.log(commentsList.length);
//   });

//   return commentsList;
// };

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

export const getUserPersonalInformation = async (userID) => {
  let personalInformation;

  onValue(ref(db, `users/${userID}/personalInformation`), (snapshot) => {
    personalInformation = snapshot.val();
  });

  return personalInformation;
};

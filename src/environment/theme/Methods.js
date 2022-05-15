// Packages
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { v4 } from "uuid";

// Firebase
import { auth, db } from "../firebase/Firebase";

export const addMovieComment = (comment) => {
  if (!!!comment) {
    return;
  }

  const commentRef = ref(db, `comments/${comment.id}`);

  set(commentRef, comment);
};

export const genereateRandomUUID = () => {
  return v4();
};

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

export const setPersonalInformationPath = (personalInformation) => {
  if (!!!personalInformation || !!!personalInformation.id) {
    return;
  }

  const personalInformationRef = ref(
    db,
    `users/${personalInformation.id}/personalInformation`
  );

  set(personalInformationRef, personalInformation);
};

export const updateUserEmail = (newEmail, password, onSuccess) => {
  const { currentUser } = auth;

  const credential = EmailAuthProvider.credential(currentUser.email, password);

  reauthenticateWithCredential(currentUser, credential)
    .then(() => {
      updateEmail(currentUser, newEmail)
        .then(() => {
          const userEmailRef = ref(
            db,
            `users/${currentUser.uid}/personalInformation/email`
          );

          set(userEmailRef, newEmail)
            .then(() => {
              sendEmailVerification(currentUser)
                .then(() => onSuccess())
                .catch((sendEmailVerificationError) =>
                  console.log(sendEmailVerificationError)
                );
            })
            .catch((updateDatabaseEmailError) =>
              console.log(updateDatabaseEmailError)
            );
        })
        .catch((updateEmailError) => console.log(updateEmailError));
    })
    .catch((reauthenticationError) => console.log(reauthenticationError));
};

export const updateUserName = (newName, onSuccess) => {
  const { currentUser } = auth;

  const userNameRef = ref(
    db,
    `users/${currentUser.uid}/personalInformation/name`
  );

  set(userNameRef, newName)
    .then(() => onSuccess())
    .catch((updateDatabaseNameError) => console.log(updateDatabaseNameError));
};

export const updateUserPassword = (password, newPassword, onSuccess) => {
  const { currentUser } = auth;

  const credential = EmailAuthProvider.credential(currentUser.email, password);

  reauthenticateWithCredential(currentUser, credential)
    .then(() => {
      updatePassword(currentUser, newPassword)
        .then(() => onSuccess())
        .catch((updatePasswordError) => console.log(updatePasswordError));
    })
    .catch((reauthenticationError) => console.log(reauthenticationError));
};

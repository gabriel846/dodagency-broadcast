// Packages
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  Persistence,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { onValue, ref, remove, set } from "firebase/database";

// Redux slices
import { authActions } from "../../store/auth/auth-slice";

// Theme
import { auth, db, facebookAuthProvider } from "./Firebase";
import {
  COULD_NOT_SIGN_OUT,
  EMAIL_ALREADY_IN_USE,
  EMAIL_NOT_VERIFIED,
  PLEASE_CHECK_YOUR_EMAIL,
  PLEASE_TRY_AGAIN,
  TOO_MANY_REQUESTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "./firebase-errors";
import { setPersonalInformationPath } from "../theme/Methods";

export const authenticateUser = (
  dispatch,
  email,
  password,
  goBackHandler
  //   rememberMe
) => {
  // const PERSISTENCE = rememberMe
  //   ? browserLocalPersistence
  //   : browserSessionPersistence;

  // setPersistence(auth, PERSISTENCE)
  //   .then(() => {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         const user = userCredential.user;

  //         if (!user || !user.emailVerified) {
  //           return;
  //         }

  //         onValue(
  //           ref(db, `users/${user.uid}/personalInformation`),
  //           (snapshot) => {
  //             const userPersonalInformation: User = snapshot.val();

  //             dispatch(
  //               authActions.setAuthenticatedUser({
  //                 authenticatedUser: userPersonalInformation,
  //               })
  //             );
  //             goBackHandler();
  //           }
  //         );
  //       })
  //       .catch((error) => console.log(error));
  //   })
  //   .catch((error) => console.log(error));

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;

      if (!user) {
        throw new Error(PLEASE_TRY_AGAIN.errorCode);
      }

      if (!user.emailVerified) {
        sendEmailVerification(user).catch((sendEmailVerificationError) =>
          console.log(sendEmailVerificationError)
        );
        throw new Error(EMAIL_NOT_VERIFIED.errorCode);
      }

      onValue(ref(db, `users/${user.uid}/personalInformation`), (snapshot) => {
        const userPersonalInformation = snapshot.val();

        dispatch(
          authActions.setAuthenticatedUser({
            authenticatedUser: userPersonalInformation,
          })
        );
        goBackHandler();
      });
    })
    .catch((error) => {
      console.log(error.message);
      console.log(error.code);

      if (error.message === EMAIL_NOT_VERIFIED.errorCode) {
        alert(EMAIL_NOT_VERIFIED.userMessage);
        return;
      }

      let errorMessage;

      switch (error.code) {
        case TOO_MANY_REQUESTS.errorCode:
          errorMessage = TOO_MANY_REQUESTS.userMessage;
          break;
        case USER_NOT_FOUND.errorCode:
          errorMessage = USER_NOT_FOUND.userMessage;
          break;
        case WRONG_PASSWORD.errorCode:
          errorMessage = WRONG_PASSWORD.userMessage;
          break;
        default:
          errorMessage = PLEASE_TRY_AGAIN.userMessage;
          break;
      }

      alert(errorMessage);
    });
};

export const authenticateUserWithFacebook = (dispatch, goBackHandler) => {
  signInWithPopup(auth, facebookAuthProvider)
    .then((userCredential) => {
      const { user } = userCredential;

      if (!user) {
        throw new Error(PLEASE_TRY_AGAIN.errorCode);
      }

      setPersonalInformationPath({ id: user.uid });

      onValue(ref(db, `users/${user.uid}/personalInformation`), (snapshot) => {
        const userPersonalInformation = snapshot.val();

        dispatch(
          authActions.setAuthenticatedUser({
            authenticatedUser: userPersonalInformation,
          })
        );
        goBackHandler();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const registerUser = (email, name, password, redirectToLoginHandler) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;

      if (!user) {
        return;
      }

      sendEmailVerification(user).then(() => {
        alert(PLEASE_CHECK_YOUR_EMAIL.userMessage);

        setPersonalInformationPath({ email, id: user.uid, name });
        redirectToLoginHandler();
      });
    })
    .catch((error) => {
      if (error.code === EMAIL_ALREADY_IN_USE.errorCode) {
        alert(EMAIL_ALREADY_IN_USE.userMessage);
      }
    });
};

// export const removeMovieFromFavorites = (movieId, onSuccess, userId) => {
//   checkIfMovieIsAddedToFavorites(databaseURL, userId, movieId).then(
//     (checkResult) => {
//       if (!!!checkResult) {
//         return;
//       }

//       getFavoriteMovieKey(databaseURL, userId, movieId).then(
//         (favoriteMovieKeyResult) => {
//           if (favoriteMovieKeyResult.trim().length > 0) {
//             remove(
//               ref(
//                 db,
//                 `users/${userId}/favoriteMovies/${favoriteMovieKeyResult}`
//               )
//             ).then(() => onSuccess());
//           }
//         }
//       );
//     }
//   );
// };

export const resetPassword = (email, redirectToLoginHandler) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(PLEASE_CHECK_YOUR_EMAIL.userMessage);
      redirectToLoginHandler();
    })
    .catch((error) => {
      console.log(error);

      if (error.message === EMAIL_NOT_VERIFIED.errorCode) {
        alert(EMAIL_NOT_VERIFIED.userMessage);
        return;
      }

      let errorMessage;

      switch (error.code) {
        case TOO_MANY_REQUESTS.errorCode:
          errorMessage = TOO_MANY_REQUESTS.userMessage;
          break;
        case USER_NOT_FOUND.errorCode:
          errorMessage = USER_NOT_FOUND.userMessage;
          break;
        default:
          errorMessage = PLEASE_TRY_AGAIN.userMessage;
          break;
      }

      alert(errorMessage);
    });
};

export const signOutUser = (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(authActions.clearAuthenticatedUser());
    })
    .catch(() => {
      alert(COULD_NOT_SIGN_OUT.userMessage);
    });
};

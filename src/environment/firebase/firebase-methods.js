// Packages
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  // GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { onValue, ref, remove, set } from "firebase/database";

// Redux slices
import { authActions } from "../../store/auth/auth-slice";

import { addUserPersonalInformationIfItDoesNotExist } from "../../lib/api";

// Theme
import { auth, db, facebookAuthProvider, googleAuthProvider } from "./Firebase";
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

export const addMovieComment = (comment) => {
  if (!!!comment) {
    return;
  }

  set(ref(db, `comments/${comment.id}`), comment);
};

export const authenticateUser = (
  dispatch,
  email,
  password,
  goBackHandler,
  rememberMe = false
) => {
  setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  )
    .then(() =>
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

          onValue(
            ref(db, `users/${user.uid}/personalInformation`),
            (snapshot) => {
              dispatch(
                authActions.setAuthenticatedUser({
                  authenticatedUser: {
                    ...snapshot.val(),
                    providers: user.providerData,
                  },
                })
              );
              goBackHandler();
            }
          );
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
        })
    )
    .catch((setPersistenceError) => console.log(setPersistenceError));
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
            authenticatedUser: {
              ...userPersonalInformation,
              providers: user.providerData,
            },
          })
        );
        goBackHandler();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const authenticateUserWithGoogle = (dispatch, goBackHandler) => {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const { user } = result;
      const personalInformation = {
        email: user.email,
        id: user.uid,
        name: user.displayName,
      };

      addUserPersonalInformationIfItDoesNotExist(user.uid, personalInformation);
      dispatch(
        authActions.setAuthenticatedUser({
          authenticatedUser: {
            ...personalInformation,
            providers: user.providerData,
          },
        })
      );
      goBackHandler();
    })
    .catch((googleSignInError) => console.log(googleSignInError));
};

export const deleteUserAccount = (password, onSuccess) => {
  const { currentUser } = auth;
  const { email, uid } = currentUser;
  const credential = EmailAuthProvider.credential(email, password);

  reauthenticateWithCredential(currentUser, credential)
    .then(() =>
      deleteUser(currentUser)
        .then(() =>
          remove(ref(db, `users/${uid}`))
            .then(() => onSuccess())
            .catch((deleteUserPathError) => console.log(deleteUserPathError))
        )
        .catch((deleteUserError) => console.log(deleteUserError))
    )
    .catch((reauthenticationError) => console.log(reauthenticationError));
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

export const setPersonalInformationPath = (personalInformation) => {
  if (!!!personalInformation || !!!personalInformation.id) {
    return;
  }

  set(
    ref(db, `users/${personalInformation.id}/personalInformation`),
    personalInformation
  );
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

export const updateUserEmailWithGoogle = (newEmail, onSuccess) => {
  const { currentUser } = auth;

  reauthenticateWithPopup(currentUser, googleAuthProvider)
    .then(() =>
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
        .catch((updateEmailError) => console.log(updateEmailError))
    )
    .catch((reauthenticationError) => console.log(reauthenticationError));
};

export const updateUserEmailWithPassword = (newEmail, password, onSuccess) => {
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

  set(ref(db, `users/${currentUser.uid}/personalInformation/name`), newName)
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

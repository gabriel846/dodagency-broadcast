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
import { auth, db, googleAuthProvider } from "./Firebase";
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

export const addMovieComment = ({ comment, onFail = () => {} }) => {
  if (!!!comment) {
    return;
  }

  set(ref(db, `comments/${comment.id}`), comment).catch(() => onFail());
};

export const authenticateUser = ({
  dispatch,
  email,
  password,
  onPersistenceError = () => {},
  onSendEmailVerificationError = () => {},
  onSuccess = () => {},
  rememberMe = false,
}) => {
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
            sendEmailVerification(user).catch(() =>
              onSendEmailVerificationError()
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
              onSuccess();
            }
          );
        })
        .catch((error) => {
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
    .catch(() => onPersistenceError());
};

export const authenticateUserWithGoogle = ({
  dispatch,
  onSignInError = () => {},
  onSuccess = () => {},
}) => {
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
      onSuccess();
    })
    .catch(() => onSignInError());
};

export const deleteUserAccount = ({
  password,
  onDeleteUserError = () => {},
  onReauthenticationError = () => {},
  onSuccess = () => {},
  onUpdateDatabaseError = () => {},
}) => {
  const { currentUser } = auth;
  const { email, uid } = currentUser;
  const credential = EmailAuthProvider.credential(email, password);

  reauthenticateWithCredential(currentUser, credential)
    .then(() =>
      deleteUser(currentUser)
        .then(() =>
          remove(ref(db, `users/${uid}`))
            .then(() => onSuccess())
            .catch(() => onUpdateDatabaseError())
        )
        .catch(() => onDeleteUserError())
    )
    .catch(() => onReauthenticationError());
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

export const resetPassword = ({ email, onSuccess = () => {} }) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(PLEASE_CHECK_YOUR_EMAIL.userMessage);
      onSuccess();
    })
    .catch((error) => {
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

export const updateUserEmailWithGoogle = ({
  newEmail,
  onReauthenticationError = () => {},
  onSendEmailVerificationError = () => {},
  onSuccess = () => {},
  onUpdateDatabaseError = () => {},
  onUpdateEmailError = () => {},
}) => {
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
                .catch(() => onSendEmailVerificationError());
            })
            .catch(() => onUpdateDatabaseError());
        })
        .catch(() => onUpdateEmailError())
    )
    .catch(() => onReauthenticationError());
};

export const updateUserEmailWithPassword = ({
  newEmail,
  password,
  onReauthenticationError = () => {},
  onSendEmailVerificationError = () => {},
  onSuccess = () => {},
  onUpdateDatabaseError = () => {},
  onUpdateEmailError = () => {},
}) => {
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
                .catch(() => onSendEmailVerificationError());
            })
            .catch(() => onUpdateDatabaseError());
        })
        .catch(() => onUpdateEmailError());
    })
    .catch(() => onReauthenticationError());
};

export const updateUserName = ({
  newName,
  onSuccess = () => {},
  onUpdateDatabaseError = () => {},
}) => {
  set(
    ref(db, `users/${auth.currentUser.uid}/personalInformation/name`),
    newName
  )
    .then(() => onSuccess())
    .catch(() => onUpdateDatabaseError());
};

export const updateUserPassword = ({
  password,
  newPassword,
  onReauthenticationError = () => {},
  onSuccess = () => {},
  onUpdatePasswordError = () => {},
}) => {
  const { currentUser } = auth;
  const credential = EmailAuthProvider.credential(currentUser.email, password);

  reauthenticateWithCredential(currentUser, credential)
    .then(() => {
      updatePassword(currentUser, newPassword)
        .then(() => onSuccess())
        .catch(() => onUpdatePasswordError());
    })
    .catch(() => onReauthenticationError());
};

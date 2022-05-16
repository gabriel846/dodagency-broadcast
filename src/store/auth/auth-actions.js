// Packages
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";

// Redux slices
import { authActions } from "./auth-slice";

// Theme
import { auth, db } from "../../environment/firebase/Firebase";

export const fetchAuthenticatedUser = () => {
  return async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        return;
      }

      onValue(ref(db, `users/${user.uid}/personalInformation`), (snapshot) => {
        const personalInformation = snapshot.val();

        if (!personalInformation) {
          return;
        }

        dispatch(
          authActions.setAuthenticatedUser({
            authenticatedUser: {
              ...personalInformation,
              providers: user.providerData,
            },
          })
        );
      });
    });
  };
};

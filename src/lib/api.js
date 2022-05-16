// Packages
import { onValue, ref, set } from "firebase/database";

// Firebase
import { db } from "../environment/firebase/Firebase";

export const addUserPersonalInformationIfItDoesNotExist = (
  userID,
  personalInformation
) => {
  const personalInformationRef = ref(db, `users/${userID}/personalInformation`);

  onValue(personalInformationRef, (snapshot) => {
    if (snapshot.exists()) {
      return;
    }

    set(personalInformationRef, personalInformation);
  });
};

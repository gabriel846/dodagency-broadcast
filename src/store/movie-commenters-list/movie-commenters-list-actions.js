// Packages
import { onValue, ref } from "firebase/database";

// Redux actions
import { movieCommentersListActions } from "./movie-commenters-list-slice";

// Firebase
import { db } from "../../environment/firebase/Firebase";

export const fetchMovieCommentersList = (movieID) => {
  return async (dispatch) => {
    onValue(ref(db, "/"), (rootSnapshot) => {
      const commentsList = Object.values(rootSnapshot.child("comments").val());
      const usersList = Object.values(rootSnapshot.child("users").val());

      commentsList
        .filter((comment) => comment.movieID === movieID)
        .forEach((comment) => {
          usersList
            .filter((user) => user.personalInformation.id === comment.userID)
            .forEach((user) => {
              dispatch(
                movieCommentersListActions.addMovieCommenter({
                  movieCommenter: user.personalInformation,
                })
              );
            });
        });
    });
  };
};

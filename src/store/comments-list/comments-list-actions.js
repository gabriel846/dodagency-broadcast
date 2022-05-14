// Packages
import { onValue, ref } from "firebase/database";

// Redux actions
import { commentsListActions } from "./comments-list-slice";

// Firebase
import { db } from "../../environment/firebase/Firebase";

export const fetchCommentsList = (movieID) => {
  return async (dispatch) => {
    onValue(ref(db, "comments"), (snapshot) => {
      const data = snapshot.val();

      dispatch(commentsListActions.clearCommentsList());

      Object.values(data)
        .filter((comment) => comment.movieID === movieID)
        .forEach((comment) =>
          dispatch(commentsListActions.addComment({ comment }))
        );
    });
  };
};

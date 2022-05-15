// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchMovieCommentersList } from "../../store/movie-commenters-list/movie-commenters-list-actions";

// Redux slices
import { movieCommentersListActions } from "../../store/movie-commenters-list/movie-commenters-list-slice";

// Components
import { Comment } from "../Comment/Comment";

// Stylings
import { StyledMovieCommentsList } from "./MovieCommentsList.style";

export function MovieCommentsList(props) {
  const { commentsList, /*commentersList,*/ movieID } = props;
  const dispatch = useDispatch();

  // const authenticatedUser = useSelector(
  //   (state) => state.auth.authenticatedUser
  // );

  // Object.values(commentsList).forEach((comment) => console.log(comment));

  useEffect(() => {
    dispatch(movieCommentersListActions.clearMovieCommentersList());
    dispatch(fetchMovieCommentersList(movieID));
  }, [dispatch, movieID]);

  const commentersList = useSelector(
    (state) => state.movieCommentersList.movieCommentersList
  );
  console.log(commentersList);

  return (
    <StyledMovieCommentsList>
      {!!commentsList &&
        commentsList.length > 0 &&
        commentsList.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            user={commentersList[index]}
            // user={
            //   Object.values(commentsList).filter(
            //     (filteredComment) =>
            //       filteredComment.userID === authenticatedUser.id
            //   )[0]
            // }
          />
        ))}
    </StyledMovieCommentsList>
  );
}

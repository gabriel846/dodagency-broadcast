// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchCommentsList } from "../../store/comments-list/comments-list-actions";

// Components
import { AddComment } from "../AddComment";
import { MovieCommentsList } from "../MovieCommentsList";

// Stylings
import { StyledMovieCommentsContainer } from "./MovieComments.style";

export function MovieComments(props) {
  const dispatch = useDispatch();
  const { authenticatedUser, movieID } = props;

  console.log(movieID);

  useEffect(() => {
    dispatch(fetchCommentsList(movieID));
  }, [dispatch, movieID]);

  const commentsList = useSelector((state) => state.commentsList.commentsList);

  return (
    <StyledMovieCommentsContainer>
      {!!authenticatedUser && (
        <AddComment authenticatedUser={authenticatedUser} movieID={movieID} />
      )}
      {!!commentsList && commentsList.length > 0 && (
        <MovieCommentsList commentsList={commentsList} movieID={movieID} />
      )}
    </StyledMovieCommentsContainer>
  );
}

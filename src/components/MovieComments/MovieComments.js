// Packages
import React from "react";
import { useSelector } from "react-redux";

// Components
import { AddComment } from "../AddComment";
import { MovieCommentsList } from "../MovieCommentsList";

// Stylings
import { StyledMovieCommentsContainer } from "./MovieComments.style";

export function MovieComments(props) {
  const { movieID } = props;

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  return (
    <StyledMovieCommentsContainer>
      {!!authenticatedUser && (
        <AddComment authenticatedUser={authenticatedUser} movieID={movieID} />
      )}
    </StyledMovieCommentsContainer>
  );
}

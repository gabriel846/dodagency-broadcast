// Packages
import React from "react";

// Components
import { Comment } from "../Comment/Comment";

// Stylings
import { StyledMovieCommentsList } from "./MovieCommentsList.style";

export function MovieCommentsList(props) {
  const { commentsList } = props;

  // Object.values(commentsList).forEach((comment) => console.log(comment));

  return (
    <StyledMovieCommentsList>
      {!!commentsList &&
        commentsList.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
    </StyledMovieCommentsList>
  );
}

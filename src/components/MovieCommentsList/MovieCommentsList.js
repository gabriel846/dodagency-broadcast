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
  const { commentsList, movieID } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieCommentersListActions.clearMovieCommentersList());
    dispatch(fetchMovieCommentersList(movieID));
  }, [dispatch, movieID]);

  const commentersList = useSelector(
    (state) => state.movieCommentersList.movieCommentersList
  );

  return (
    <StyledMovieCommentsList>
      {!!commentsList &&
        commentsList.length > 0 &&
        commentsList.map((comment, index) => (
          <Comment key={index} comment={comment} user={commentersList[index]} />
        ))}
    </StyledMovieCommentsList>
  );
}

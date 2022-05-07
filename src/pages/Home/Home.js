// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchMoviesList } from "../../store/movies-list/movies-list-actions";

// Components
import { MoviesList } from "../../components/MoviesList";

export function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesList());
  }, [dispatch]);

  const moviesList = useSelector((state) => state.moviesList.moviesList);

  return (
    <>
      <MoviesList moviesList={moviesList} />
    </>
  );
}

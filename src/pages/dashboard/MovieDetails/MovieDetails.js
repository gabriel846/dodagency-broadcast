// Packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Redux actions
import {
  addMovieToFavorites,
  checkIfMovieIsAddedToFavorites,
  removeMovieFromFavorites,
} from "../../../store/is-favorite-movie/is-favorite-movie-actions";
import { fetchSelectedMovie } from "../../../store/selected-movie/selected-movie-actions";

// Redux slice
import { selectedMovieActions } from "../../../store/selected-movie/selected-movie-slice";

// Components
import { GoBackIcon } from "../../../components/UI/GoBackIcon/GoBackIcon";
import { Error } from "../../../components/Error";
import { Loading } from "../../../components/Loading";
import { MovieComments } from "../../../components/MovieComments/MovieComments";
import { MovieGenresList } from "../../../components/MovieGenresList";
import { MovieTorrentsList } from "../../../components/MovieTorrentsList";

// Themes
import {
  ERROR_CONTAINER_STYLE,
  ERROR_MESSAGE_STYLE,
  FETCHING_ERROR_MESSAGE,
  FETCHING_MOVIE_DETAILS_MESSAGE,
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE_STYLE,
  MOCKED_AUTHENTICATED_USER_ID,
  MOVIE_ADDED_TO_FAVORITES_MESSAGE,
  MOVIE_REMOVED_FROM_FAVORITES_MESSAGE,
} from "../../../environment/theme/Variables";

// Stylings
import {
  StyledMovieDetailsContainer,
  StyledMovieDetailsSectionTitle,
  StyledMovieImage,
  StyledMovieIsAddedToFavoritesIcon,
  StyledMovieIsNotAddedToFavoritesIcon,
} from "./MovieDetails.style";

export function MovieDetails() {
  const [hasFetchingError, setHasFetchingError] = useState(false);
  const [hasImageLoadingError, setHasImageLoadingError] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedMovieID = location.pathname.split("/details/")[1];

  useEffect(() => {
    dispatch(selectedMovieActions.clearSelectedMovie());
    dispatch(
      fetchSelectedMovie(selectedMovieID, () =>
        setHasFetchingError((previousValue) => !previousValue)
      )
    );
  }, [dispatch, selectedMovieID]);

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const { id: authenticatedUserID } =
    authenticatedUser || MOCKED_AUTHENTICATED_USER_ID;

  useEffect(() => {
    dispatch(
      checkIfMovieIsAddedToFavorites(authenticatedUserID, selectedMovieID)
    );
  }, [authenticatedUserID, dispatch, selectedMovieID]);

  const isAddedToFavorites = useSelector(
    (state) => state.isFavoriteMovie.isAddedToFavorites
  );
  const selectedMovieDetails = useSelector(
    (state) => state.selectedMovie.selectedMovie
  );

  return (
    <>
      {!!!selectedMovieDetails && !hasFetchingError ? (
        <Loading
          containerStyle={LOADING_CONTAINER_STYLE}
          message={FETCHING_MOVIE_DETAILS_MESSAGE}
          textStyle={LOADING_MESSAGE_STYLE}
        />
      ) : hasFetchingError ? (
        <Error
          containerStyle={ERROR_CONTAINER_STYLE}
          hasGoBackButton
          message={FETCHING_ERROR_MESSAGE}
          textStyle={ERROR_MESSAGE_STYLE}
        />
      ) : (
        <StyledMovieDetailsContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <GoBackIcon />
            {!!authenticatedUser &&
              (isAddedToFavorites ? (
                <StyledMovieIsAddedToFavoritesIcon
                  onClick={() =>
                    removeMovieFromFavorites({
                      userID: authenticatedUserID,
                      movieID: selectedMovieID,
                      onFail: () =>
                        alert("Couldn't remove the movie from favorites..."),
                      onSuccess: () =>
                        alert(MOVIE_REMOVED_FROM_FAVORITES_MESSAGE),
                    })
                  }
                />
              ) : (
                <StyledMovieIsNotAddedToFavoritesIcon
                  onClick={() =>
                    addMovieToFavorites({
                      userID: authenticatedUserID,
                      movieID: selectedMovieID,
                      onFail: () => alert("Couldn't add movie to favorites..."),
                      onSuccess: () => alert(MOVIE_ADDED_TO_FAVORITES_MESSAGE),
                    })
                  }
                />
              ))}
          </div>
          {!!selectedMovieDetails.title_long && (
            <h1>{selectedMovieDetails.title_long}</h1>
          )}
          {!!selectedMovieDetails.large_cover_image && !hasImageLoadingError && (
            <div>
              <StyledMovieImage
                alt={selectedMovieDetails.title_long}
                onError={() =>
                  setHasImageLoadingError((previousValue) => !previousValue)
                }
                src={selectedMovieDetails.medium_cover_image}
              />
            </div>
          )}
          {!!selectedMovieDetails.genres &&
            selectedMovieDetails.genres.length > 0 && (
              <div>
                <StyledMovieDetailsSectionTitle>
                  Genres
                </StyledMovieDetailsSectionTitle>
                <MovieGenresList
                  movieGenresList={selectedMovieDetails.genres}
                  onMovieGenreClick={() => {}}
                />
              </div>
            )}
          {!!selectedMovieDetails.description_full && (
            <div>
              <StyledMovieDetailsSectionTitle>
                Description
              </StyledMovieDetailsSectionTitle>
              <p>{selectedMovieDetails.description_full}</p>
            </div>
          )}
          {!!selectedMovieDetails.date_uploaded && (
            <div>
              <StyledMovieDetailsSectionTitle>
                Date uploaded
              </StyledMovieDetailsSectionTitle>
              <p>{selectedMovieDetails.date_uploaded}</p>
            </div>
          )}
          {!isNaN(selectedMovieDetails.rating) && (
            <div>
              <StyledMovieDetailsSectionTitle>
                Rating
              </StyledMovieDetailsSectionTitle>
              <p>{selectedMovieDetails.rating}</p>
            </div>
          )}
          {!isNaN(selectedMovieDetails.runtime) && (
            <div>
              <StyledMovieDetailsSectionTitle>
                Runtime
              </StyledMovieDetailsSectionTitle>
              <p>{`${selectedMovieDetails.runtime} minutes`}</p>
            </div>
          )}
          {!!selectedMovieDetails.language && (
            <div>
              <StyledMovieDetailsSectionTitle>
                Language
              </StyledMovieDetailsSectionTitle>
              <p>{selectedMovieDetails.language.toUpperCase()}</p>
            </div>
          )}
          {!!selectedMovieDetails.torrents &&
            selectedMovieDetails.torrents.length > 0 && (
              <div>
                <StyledMovieDetailsSectionTitle>
                  Torrents
                </StyledMovieDetailsSectionTitle>
                <MovieTorrentsList
                  movieTorrentsList={selectedMovieDetails.torrents}
                />
              </div>
            )}
          <div>
            <StyledMovieDetailsSectionTitle>
              Comments
            </StyledMovieDetailsSectionTitle>
            <MovieComments movieID={selectedMovieDetails.id} />
          </div>
        </StyledMovieDetailsContainer>
      )}
    </>
  );
}

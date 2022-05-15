// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Redux actions
import { fetchSelectedMovie } from "../../../store/selected-movie/selected-movie-actions";

// Redux slice
import { selectedMovieActions } from "../../../store/selected-movie/selected-movie-slice";

// Components
import { GoBackIcon } from "../../../components/UI/GoBackIcon/GoBackIcon";
import { Loading } from "../../../components/Loading";
import { MovieComments } from "../../../components/MovieComments/MovieComments";
import { MovieGenresList } from "../../../components/MovieGenresList";
import { MovieTorrentsList } from "../../../components/MovieTorrentsList";

// Themes
import {
  FETCHING_MOVIE_DETAILS_MESSAGE,
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE_STYLE,
} from "../../../environment/theme/Variables";

// Stylings
import {
  StyledMovieDetailsContainer,
  StyledMovieDetailsSectionTitle,
  StyledMovieImage,
} from "./MovieDetails.style";

export function MovieDetails() {
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedMovieID = location.pathname.split("/details/")[1];

  useEffect(() => {
    dispatch(selectedMovieActions.clearSelectedMovie());
    dispatch(fetchSelectedMovie(selectedMovieID));
  }, [dispatch, selectedMovieID]);

  const selectedMovieDetails = useSelector(
    (state) => state.selectedMovie.selectedMovie
  );

  return (
    <>
      {!!!selectedMovieDetails ? (
        <Loading
          containerStyle={LOADING_CONTAINER_STYLE}
          message={FETCHING_MOVIE_DETAILS_MESSAGE}
          textStyle={LOADING_MESSAGE_STYLE}
        />
      ) : (
        <StyledMovieDetailsContainer>
          <div>
            <GoBackIcon />
          </div>
          {!!selectedMovieDetails.title_long && (
            <h1 style={{ marginBottom: "0.5em" }}>
              {selectedMovieDetails.title_long}
            </h1>
          )}
          {!!selectedMovieDetails.large_cover_image && (
            <div>
              <StyledMovieImage
                alt={selectedMovieDetails.title_long}
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
          {!!selectedMovieDetails.rating && (
            <div>
              <StyledMovieDetailsSectionTitle>
                Rating
              </StyledMovieDetailsSectionTitle>
              <p>{selectedMovieDetails.rating}</p>
            </div>
          )}
          {!!selectedMovieDetails.runtime && (
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

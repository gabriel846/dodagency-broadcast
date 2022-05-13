// Packages
import React from "react";

// Components
import { MovieTorrent } from "../MovieTorrent/MovieTorrent";

// Stylings
import { StyledMovieTorrentsList } from "./MovieTorrentsList.style";

export function MovieTorrentsList(props) {
  const { movieTorrentsList } = props;

  return (
    <StyledMovieTorrentsList>
      {movieTorrentsList.map((torrent, index) => (
        <MovieTorrent key={index} torrent={torrent} />
      ))}
    </StyledMovieTorrentsList>
  );
}

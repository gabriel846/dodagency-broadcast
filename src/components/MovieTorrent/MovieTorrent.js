// Packages
import React from "react";

// Stylings
import {
  StyledMovieTorrent,
  StyledMovieTorrentDownloadButton,
  StyledMovieTorrentDownloadButtonLink,
} from "./MovieTorrent.style";

export function MovieTorrent(props) {
  const { torrent } = props;

  return (
    <StyledMovieTorrent>
      {!!torrent.quality && (
        <div>
          <h3>Quality</h3>
          <p>{torrent.quality}</p>
        </div>
      )}
      {!!torrent.size && (
        <div>
          <h3>Size</h3>
          <p>{torrent.size}</p>
        </div>
      )}
      {!!torrent.date_uploaded && (
        <div>
          <h3>Date uploaded</h3>
          <p>{torrent.date_uploaded}</p>
        </div>
      )}
      {!!torrent.url && (
        <StyledMovieTorrentDownloadButton>
          <StyledMovieTorrentDownloadButtonLink href={torrent.url}>
            Download
          </StyledMovieTorrentDownloadButtonLink>
        </StyledMovieTorrentDownloadButton>
      )}
    </StyledMovieTorrent>
  );
}

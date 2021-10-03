import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Dropdown,
  NavDropdown,
  DropdownButton,
} from "react-bootstrap";
import Status from "./Status";
import Lyrics from "./Lyrics";
import "./styles/Artists.scss";

const LOADING = "LOADING";
const SHOW = "SHOW";

export default function Artists(props) {
  const [state, setState] = useState({
    artist: "",
    albums: [],
    tracks: [],
    lyrics: "",
    albumArt: [],
    currentAlbum: "",
    currentTrack: "",
    mode: SHOW,
  });

  const setArtist = (artist) => setState({ ...state, artist });
  const setAlbums = (albums) => setState({ ...state, albums });
  const setTracks = (tracks, currentAlbum) =>
    setState({ ...state, tracks, currentAlbum });
  const setLyrics = (lyrics, currentTrack, albumArt) =>
    setState({ ...state, lyrics, currentTrack, albumArt });
  const setMode = (mode) => setState({ ...state, mode });

  function resetLyrics() {
    setState({
      ...state,
      artist: "",
      albums: [],
      tracks: [],
      lyrics: "",
      albumArt: [],
      currentAlbum: "",
      currentTrack: "",
      mode: LOADING,
    });
  }

  async function searchArtist() {
    resetLyrics();
    const artistData = { name: state.artist };
    return axios
      .post("/api/albums", artistData)
      .then((response) => {
        console.log(response);
        const artistAlbumInfo = [];
        for (let i = 0; i < response.data.length; i++) {
          let info = {
            albumID: response.data[i].album.album_id,
            albumName: response.data[i].album.album_name,
            releaseDate: response.data[i].album.album_release_date,
          };
          artistAlbumInfo.push(info);
        }
        setMode(SHOW);
        setAlbums(artistAlbumInfo);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  async function albumTracks(key) {
    resetLyrics();
    const trackData = { id: key };
    return axios
      .post("/api/tracks", trackData)
      .then((response) => {
        const albumTrackInfo = [];
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].track.has_lyrics) {
            let info = {
              trackID: response.data[i].track.track_id,
              trackName: response.data[i].track.track_name,
            };
            albumTrackInfo.push(info);
          }
        }
        setMode(SHOW);
        setTracks(albumTrackInfo, response.data[0].track.album_name);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  async function trackLyrics(key) {
    resetLyrics();
    const lyrics = {
      track: key,
      artist: state.artist,
      album: state.currentAlbum,
    };
    return axios
      .post("/api/lyrics", lyrics)
      .then((response) => {
        setMode(SHOW);
        setLyrics(response.data[0], key, response.data[1]);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  return (
    <body className="artists-body">
      <section className="form-align">
        <Form
          className="form-layout"
          autoComplete="on"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            className="artist-element"
            placeholder="Enter Artist Name"
            type="text"
            id="artist"
            onChange={(event) => {
              setArtist(event.target.value);
            }}
          />
          <Button
            className="artist-element"
            variant="dark"
            onClick={searchArtist}
            type="submit"
          >
            Search
          </Button>
        </Form>
        <Dropdown className="album-track-dropdowns">
          <DropdownButton
            className="artist-element"
            variant="secondary"
            onSelect={albumTracks}
            title="Albums"
            id="basic-nav-dropdown"
          >
            {state.albums.map((album) => {
              return (
                <NavDropdown.Item eventKey={album.albumID}>
                  {album.albumName}
                </NavDropdown.Item>
              );
            })}
          </DropdownButton>
          <div> </div>
          <DropdownButton
            className="artist-element"
            variant="secondary"
            onSelect={trackLyrics}
            title="Tracks"
            id="basic-nav-dropdown"
          >
            {state.tracks.map((track) => {
              return (
                <NavDropdown.Item eventKey={track.trackName}>
                  {track.trackName}
                </NavDropdown.Item>
              );
            })}
          </DropdownButton>
        </Dropdown>
        {state.albumArt[1] && (
          <img className="artist-element" src={state.albumArt[1]} alt="" />
        )}
      </section>
      <br />
      <br />
      <div className="lyric-border">
        {state.mode === LOADING && <Status message={state.mode} />}
        {state.mode === SHOW && state.lyrics && (
          <Lyrics
            artist={state.artist}
            lyrics={state.lyrics}
            album={state.currentAlbum}
            track={state.currentTrack}
            albumArt={state.albumArt}
          />
        )}
      </div>
    </body>
  );
}

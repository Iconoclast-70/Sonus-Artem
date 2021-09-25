import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Nav, NavDropdown, Container } from "react-bootstrap";
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
    albumArt: {},
    mode: SHOW,
  });

  const setArtist = (artist) => setState({ ...state, artist });
  const setAlbums = (albums) => setState({ ...state, albums });
  const setTracks = (tracks) => setState({ ...state, tracks });
  const setLyrics = (lyrics) => setState({ ...state, lyrics });
  const setMode = (mode) => setState({ ...state, mode });

  async function searchArtist() {
    setMode(LOADING);
    const artistData = { name: state.artist };
    return axios
      .post("/api/albums", artistData)
      .then((response) => {
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
    setMode(LOADING);
    const trackData = { id: key };
    return axios
      .post("/api/tracks", trackData)
      .then((response) => {
        const albumTrackInfo = [];
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          let info = {
            trackID: response.data[i].track.track_id,
            trackName: response.data[i].track.track_name,
          };
          albumTrackInfo.push(info);
        }
        setMode(SHOW);
        setTracks(albumTrackInfo);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  async function trackLyrics(key) {
    setMode(LOADING);
    const lyrics = { track: key, artist: state.artist };
    return axios
      .post("/api/lyrics", lyrics)
      .then((response) => {
        console.log(typeof response.data);
        setMode(SHOW);
        setLyrics(response.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  return (
    <Container>
      <section>
        <Form
          autoComplete="on"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label>Enter Artist Name</label>
          <br />
          <input
            type="text"
            id="artist"
            onChange={(event) => {
              setArtist(event.target.value);
            }}
          />
          <br />
          <br />
          <Button variant="primary" onClick={searchArtist} type="submit">
            Submit
          </Button>
        </Form>
        {state.mode === SHOW && (
          <Nav>
            <NavDropdown
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
            </NavDropdown>
            <NavDropdown
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
            </NavDropdown>
          </Nav>
        )}
      </section>

      <div>
        {state.mode === LOADING && <Status message={state.mode} />}
        {state.mode === SHOW && <Lyrics lyrics={state.lyrics} />}
      </div>
    </Container>
  );
}

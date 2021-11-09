import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
//STYLES - SCSS
import "./styles/App.scss";
import ArtistLyrics from "./ArtistLyrics";
import Login from "./Login";
import Register from "./Register";
import Splash from "./Splash";

const lyricSong = "Lyric & Song Search";
const songs = " Songs";
const albums = " Albums";

export default function App() {
  const [token, setToken] = useState();

  return (
    <Router>
      <div>
        <Navbar variant="dark" className="nav-align" sticky="top">
          <Nav className="nav-main">
            <img className="home-icon" alt="" />
            <Nav.Link className="sonus-font" href="/">
              SONUS ARTEM
            </Nav.Link>
            <Nav.Link href="/api/artists/lyrics">{lyricSong}</Nav.Link>
            <Nav.Link href="/api/artists/songs">{songs}</Nav.Link>
            <Nav.Link href="/api/artists/albums">{albums}</Nav.Link>
            <Nav.Link href="/api/artists/mixtapes">Mix Tape</Nav.Link>
          </Nav>
          <Nav className="nav-login-register">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Splash
              splashImage="./images/library6.jpg"
              className="sonus-splash"
            />
          </Route>
          <Route path="/api/artists/lyrics">
            <ArtistLyrics />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

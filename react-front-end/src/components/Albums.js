import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  Button,
  NavDropdown,
  Container,
} from "react-bootstrap";

export default function Albums(props) {
  const [state, setState] = useState({
    artist: props.artist,
    albums: [],
  });

  useEffect(() => {
    axios
      .get("api/albums")
      .then((response) => {
        console.log("ALBUMS ", response);
        setState((prev) => ({
          ...prev,
          albums: response.data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="App">
        <h1>{props.albums}</h1>
      </div>
    </div>
  );
}

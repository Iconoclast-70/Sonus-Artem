import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container } from "react-bootstrap";

export default function Artists(props) {
  const [state, setState] = useState({
    artist: "",
    search: false,
  });

  const setArtist = (artist) => setState({ ...state, artist });

  async function searchArtist() {
    const artistData = { name: state.artist };
    return axios
      .post("/api/albums", artistData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  return (
    <div>
      <Form
        className="mb-3"
        autoComplete="off"
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
    </div>
  );
}

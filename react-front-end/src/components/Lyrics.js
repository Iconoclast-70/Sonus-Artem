import React from "react";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Stack";

export default function Lyrics(props) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}
    >
      <img
        id="album-art-left"
        className="album-image"
        src={props.albumArt[3]}
        alt=""
      />
      <pre>{props.lyrics}</pre>
    </Stack>
  );
}

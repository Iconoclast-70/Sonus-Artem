import React from "react";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Lyrics(props) {
  return (
    <body className="lyrics-body">
      {console.log("PROP TRACK ", props.track)}
      <h1>{props.track}</h1>
    </body>
  );
}

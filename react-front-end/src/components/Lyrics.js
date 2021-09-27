import React from "react";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Lyrics(props) {
  return (
    <body className="lyrics-body">
      <br />
      <div className="lyric-border">
        <pre>{props.lyrics}</pre>
      </div>
    </body>
  );
}

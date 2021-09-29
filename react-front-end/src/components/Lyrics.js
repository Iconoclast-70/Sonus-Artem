import React from "react";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Lyrics(props) {
  return (
    <body className="lyrics-body">
      <div className="lyric-border">
        <h3 className="track">
          {props.track} from the album {props.album}
        </h3>
        <pre>{props.lyrics}</pre>
      </div>
    </body>
  );
}

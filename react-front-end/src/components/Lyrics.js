import React from "react";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export default function Lyrics(props) {
  return (
    <Container>
      <pre>{props.lyrics}</pre>
    </Container>
  );
}

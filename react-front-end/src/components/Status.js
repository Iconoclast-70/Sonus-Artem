import React from "react";
import "./styles/Loader.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export default function Status(props) {
  return (
    <Container>
      <img className="loader" alt="" />
    </Container>
  );
}

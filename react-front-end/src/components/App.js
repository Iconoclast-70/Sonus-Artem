import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
//STYLES - SCSS
import "./styles/App.scss";
import Artists from "./Artists";

export default function App(props) {
  return (
    <body>
      <div>
        <Navbar variant="dark" className="navigation-bar" sticky="top">
          <Container className="nav-align">
            <Navbar.Brand href="/">Sonus Artem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/api/artists">Artist Search</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/api/artists">
            <Artists />
          </Route>
        </Switch>
      </BrowserRouter>
    </body>
  );
}

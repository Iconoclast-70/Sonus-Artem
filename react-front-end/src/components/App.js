import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./App.css";
//import Login from "./Login/Login";
import Artists from "./Artists";

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

export default function App(props) {
  const [state, setState] = useState({
    message: "Click to load data",
  });

  // const token = getToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  const fetchData = function () {
    axios.get("/api/data").then((response) => {
      setState({
        message: response.data.message,
      });
      console.log(response.data.message);
    });
  };

  return (
    <div className="wrapper">
      <Container>
        <Navbar className="navigation-bar" sticky="top">
          <Container>
            <Navbar.Brand href="#home">Sonus Artem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/api/artists">Artist Search</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <BrowserRouter>
        <Switch>
          <Route path="/api/artists">
            <Artists />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

{
  /* <div className="App">
<h1>{state.message}</h1>
<button onClick={fetchData}>Fetch Data</button>
</div> */
}

import React, { useState } from "react";
import axios from "axios";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Stack";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  function save() {
    const loginData = { username: username, password: password, email: email };
    console.log("LOGINDATA ", loginData)
    return axios
      .post("/login", loginData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  return (
    <div className="">
      <form
        className="user-login"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1>Login</h1>

       <div className="user-name">
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </div>

        <div className="user-email">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="user-password">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button
          className="submit-button"
          type="submit"
          onClick={(event) => {
            save(event);
          }}
        >
          <span>Login</span>
        </button>
      </form>
    </div>
  );
}

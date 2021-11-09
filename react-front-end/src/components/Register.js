import React, { useState } from "react";
import axios from "axios";
import "./styles/Lyrics.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Stack";

export default function Register(props) {
  
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    avatar: []
  });

  const setUser = (
    username,
    password,
    email,
    avatar,
  ) =>
    setState({
      ...state,
      username,
      password,
      email,
      avatar,
    });

  function save() {
    const loginData = { username: state.username, password: state.password, email: state.email };
    console.log("REGISTER ", loginData)
    return axios
      .post("/register", loginData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }  

  return (
    <div className="">
      <form className="user-registration">
        <h1>Register</h1>

        <div className="user-name">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={""}
            onChange={""}
          />
        </div>

        <div className="email">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={""}
            onChange={""}
          />
        </div>

        <div className="password">
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            name="password"
            value={""}
            onChange={""}
          />
        </div>

        <div className="avatar">
          <input
            type="text"
            className="form-control"
            placeholder="Avatar Url"
            name="avatar"
            value={""}
            s
            onChange={""}
          />
        </div>

        <button
          className="submit-button"
          type="submit"
          onClick={(event) => save(event)}
        >
          <span>Register</span>
        </button>
      </form>
    </div>
  );
}

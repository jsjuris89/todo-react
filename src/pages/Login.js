import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { CredentialsContext } from "../App";
import { handleErrors } from "./Register";

const GlobalStyle = createGlobalStyle`
    body {
        all: initial;
    }
    form input {
      border: 2px solid lightgrey;
      font-size: 18px;
      margin: 3px;
    }
    form button {
      color: initial;
      background: initial;
      font-size: 20px;
      border: 2px solid black;
    }
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/welcome");
      })
      .catch((error) => {
        console.log("we are here", error);
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div>
      <GlobalStyle />
      <h1>Login</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

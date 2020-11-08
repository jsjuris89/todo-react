import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

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

const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    console.log("error message", message);
    throw Error(message);
  }
  return response.json();
};
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const register = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/register", {
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
      .then(() => {})
      .catch((error) => {
        console.log("we are here", error);
        setIsError(true);
      });
  };
  return (
    <div>
      <GlobalStyle />
      <h1>Register</h1>
      <form onSubmit={register}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

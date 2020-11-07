import React from "react";
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

export default function Register() {
  return (
    <div>
      <GlobalStyle />
      <h1>Register</h1>
      <form>
        <input placeholder="username" />
        <input placeholder="password" />
        <button>Register</button>
      </form>
    </div>
  );
}

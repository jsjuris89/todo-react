import React from "react";
import { Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        all: initial;
    }
`;

export default function Welcome() {
  return (
    <div>
      <GlobalStyle />
      <h1>Welcome</h1>
      <Link to="/register">Register</Link>
    </div>
  );
}

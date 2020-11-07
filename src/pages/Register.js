import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        all: initial;
    }
`;

export default function Register() {
  return (
    <div>
      <GlobalStyle />
      <h1>Register</h1>
      <p>some paragraph</p>
    </div>
  );
}

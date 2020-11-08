import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { CredentialsContext } from "../App";

const GlobalStyle = createGlobalStyle`
    body {
        all: initial;
    }
`;

export default function Welcome() {
  const [credentails] = useContext(CredentialsContext);
  return (
    <div>
      <GlobalStyle />
      <h1>Welcome {credentails.username}</h1>
      <Link to="/register">Register</Link>
    </div>
  );
}

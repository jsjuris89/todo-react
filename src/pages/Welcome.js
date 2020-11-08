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
      <h1>Welcome {credentails && credentails.username}</h1>
      {!credentails && <Link to="/register">Register</Link>}
    </div>
  );
}

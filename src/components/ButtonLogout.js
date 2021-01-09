import React, { useContext } from "react";
import styles from "./ButtonLogout.module.css";
import { CredentialsContext } from "../App";

const ButtonLogout = () => {
  const { setCredentials } = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <a className={styles.aTag} href="#" onClick={logout}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Logout
    </a>
  );
};

export default ButtonLogout;

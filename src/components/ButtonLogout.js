import React, { useContext } from "react";
import styles from "./ButtonLogout.module.css";
import { CredentialsContext } from "../App";

const ButtonLogout = (props) => {
  const { setCredentials } = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
    props.setTodos([]);
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

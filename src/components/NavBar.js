import React from "react";
import styles from "./NavBar.module.css";
import ButtonLogout from "./ButtonLogout";

const NavBar = (props) => {
  return (
    <div className={styles.navBar}>
      <div className={styles.leftSide}>
        <p>Welcome {props.credentials.username}</p>
      </div>
      <div className={styles.rightSide}>
        <ButtonLogout />
      </div>
    </div>
  );
};

export default NavBar;

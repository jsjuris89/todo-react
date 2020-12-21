import React, { useState, useContext } from "react";
import styles from "./Signup.module.css";

import { CredentialsContext } from "../App";
import Form from "./Form";
import TodoList from "./TodoList";

const Signup = () => {
  const [signupToggle, setSignupToggle] = useState(false);
  const switchSignup = () => setSignupToggle(true);
  const switchLogin = () => setSignupToggle(false);

  const credentials = useContext(CredentialsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {!credentials && (
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <div className={styles.title_text}>
              <div className={styles.title}>Login Form</div>
              <div className={styles.title}>Signup</div>
            </div>

            <div className={styles.form_container}>
              <div className={styles.slide_controls}>
                <input
                  type="radio"
                  name="slider"
                  id="login"
                  className={styles.login_input}
                  defaultChecked
                />
                <input
                  type="radio"
                  name="slider"
                  id="signup"
                  className={styles.signup_input}
                />
                <label
                  htmlFor="login"
                  className={`${styles.slide} ${styles.login}`}
                  onClick={switchLogin}
                >
                  Login
                </label>
                <label
                  htmlFor="signup"
                  className={`${styles.slide} ${styles.signup}`}
                  onClick={switchSignup}
                >
                  Signup
                </label>
                <div className={styles.slide_tab}></div>
              </div>

              <div className={styles.form_inner}>
                <form
                  className={styles.login}
                  style={
                    signupToggle ? { marginLeft: "-50%" } : { marginLeft: "0" }
                  }
                >
                  <div className={styles.field}>
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <input type="submit" value="Login" />
                  </div>
                  <div className={styles.signup_link}>
                    Not a member?{" "}
                    <a href="#" onClick={switchSignup}>
                      SignUp now
                    </a>
                  </div>
                </form>

                <form className={styles.signup}>
                  <div className={styles.field}>
                    <input type="text" placeholder="Username" />
                  </div>
                  <div className={styles.field}>
                    <input type="password" placeholder="Password" />
                  </div>
                  <div className={styles.field}>
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                  <div className={styles.field}>
                    <input type="submit" value="Signup" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {credentials && (
        <div>
          <Form />
          <TodoList />
        </div>
      )}
    </div>
  );
};

export default Signup;

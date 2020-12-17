import React, { useState, useContext } from "react";
import "./Signup.css";

import { CredentialsContext } from "../App";
import Form from "./Form";
import TodoList from "./TodoList";

const Signup = () => {
  const [signupToggle, setSignupToggle] = useState(false);
  const switchSignup = () => setSignupToggle(true);
  const switchLogin = () => setSignupToggle(false);

  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {!credentials && (
        <div>
          <div className="wrapper">
            <div className="title-text">
              <div className="title login">Login Form</div>
              <div className="title signup">Signup</div>
            </div>

            <div className="form-container">
              <div className="slide-controls">
                <input type="radio" name="slider" id="login" defaultChecked />
                <input type="radio" name="slider" id="signup" />
                <label
                  htmlFor="login"
                  className="slide login"
                  onClick={switchLogin}
                >
                  Login
                </label>
                <label
                  htmlFor="signup"
                  className="slide signup"
                  onClick={switchSignup}
                >
                  Signup
                </label>
                <div className="slide-tab"></div>
              </div>

              <div className="form-inner">
                <form
                  className="login"
                  style={
                    signupToggle ? { marginLeft: "-50%" } : { marginLeft: "0" }
                  }
                >
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <input type="submit" value="Login" />
                  </div>
                  <div className="signup-link">
                    Not a member?{" "}
                    <a href="#" onClick={switchSignup}>
                      SignUp now
                    </a>
                  </div>
                </form>

                <form className="signup">
                  <div className="field">
                    <input type="text" placeholder="Username" />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Password" />
                  </div>
                  <div className="field">
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                  <div className="field">
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

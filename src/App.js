import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";

export const CredentialsContext = React.createContext();

function App() {
  console.log("[APP.js] running....");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [credentials, setCredentials] = useState(null);
  console.log("[APP.js] credentials are:", credentials);
  // const [credentials, setCredentials] = useState({
  //   username: "juris",
  //   password: "asdf",
  // });
  // console.log("APP.js - credentials -->", credentials);
  console.log("[APP.js] todos:", todos);
  // console.log("filteredTodos", filteredTodos);

  // Run once when the app starts
  // useEffect(() => {
  //   getFromLocalStorage();
  // }, []);

  useEffect(() => {
    filterHandler();
    // saveToLocalStorage();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // Save to localstorage
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getFromLocalStorage = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todosInLocalStorage = JSON.parse(localStorage.getItem("todos"));
      setTodos(todosInLocalStorage);
    }
  };

  return (
    <CredentialsContext.Provider value={{ credentials, setCredentials }}>
      {!credentials && <Signup />}

      {credentials && (
        <div className={styles.body}>
          <NavBar credentials={credentials} />
          {/* <h1>Welcome {credentials && credentials.username}</h1> */}
          <Form todos={todos} setTodos={setTodos} setStatus={setStatus} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
          />
        </div>
      )}
    </CredentialsContext.Provider>
  );
}

export default App;

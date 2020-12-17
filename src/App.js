import React, { useState, useEffect } from "react";
// import "./App.css";
// TO FIX: App.css is conflicting with Signup.css styles"

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Signup from "./components/Signup";

export const CredentialsContext = React.createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Run once when the app starts
  useEffect(() => {
    getFromLocalStorage();
  }, []);

  useEffect(() => {
    filterHandler();
    saveToLocalStorage();
  }, [todos, status]);

  const credentialsState = useState(null);
  // const credentialsState = useState({ username: "user1", password: 111 });

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
    <CredentialsContext.Provider value={credentialsState}>
      {!credentialsState[0] && <Signup />}

      {credentialsState[0] && (
        <div>
          <h1>Welcome {credentialsState[0] && credentialsState[0].username}</h1>
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

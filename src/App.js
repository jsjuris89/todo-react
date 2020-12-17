import React, { useState, useEffect } from "react";
import "./App.css";

import Form from "./components/Form";
import TodoList from "./components/TodoList";

export const CredentialsContext = React.createContext();

function App() {
  const [inputText, setInputText] = useState("");
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
      <div className="App">
        <header>
          <h1>Elnath Todo List</h1>
        </header>
        <Form
          inputText={inputText}
          todos={todos}
          setTodos={setTodos}
          setInputText={setInputText}
          setStatus={setStatus}
        />
        <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos}
        />
      </div>
    </CredentialsContext.Provider>
  );
}

export default App;

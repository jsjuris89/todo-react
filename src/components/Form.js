import React, { useState, useContext } from "react";
import styles from "../App.module.css";
import { CredentialsContext } from "../App";

const Form = ({ todos, setTodos, setStatus }) => {
  const [todoText, setTodoText] = useState("");
  const { credentials } = useContext(CredentialsContext);
  // console.log("useContext variable credentials is", credentials);

  const submitTodoHandler = (e) => {
    e.preventDefault();
    // if (!todoText) return;

    const newTodo = {
      text: todoText,
      completed: false,
      id: Math.random() * 1000,
    };
    const newTodoList = [...todos, newTodo];
    // console.log("newTodoList:", newTodoList);
    setTodos(newTodoList);
    setTodoText("");
    saveMongodb(newTodoList);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const saveMongodb = (newTodos) => {
    fetch(`http://localhost:5100/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  return (
    <form className={styles.form}>
      <input
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        type="text"
      />
      <button onClick={submitTodoHandler} type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className={styles.selectWrapper}>
        <select
          onChange={statusHandler}
          name="todos"
          className={styles.selectTag}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;

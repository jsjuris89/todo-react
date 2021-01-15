import React, { useContext } from "react";
import styles from "../App.module.css";

import { CredentialsContext } from "../App";

const Todo = ({ text, todo, todos, setTodos }) => {
  const { credentials } = useContext(CredentialsContext);
  console.log("credentials", credentials);

  console.log("todo._id --->", todo._id);
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
    fetch(`http://localhost:5100/todos/${todo._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => console.log("backend data received:", data))
      .catch((err) => console.log(err));
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  // const saveMongodb = (newTodos) => {
  //   fetch(`http://localhost:5100/todos`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${credentials.username}:${credentials.password}`,
  //     },
  //     body: JSON.stringify(newTodos),
  //   }).then(() => {});
  // };
  return (
    <div className={styles.todo}>
      <li
        className={`${styles.todoItem} ${
          todo.completed ? styles.completed : ""
        }`}
      >
        {text}
      </li>
      <button onClick={completeHandler} className={styles.completeBtn}>
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className={styles.trashBtn}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;

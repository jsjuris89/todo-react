import React, { useEffect, useContext } from "react";
import styles from "../App.module.css";
import { CredentialsContext } from "../App";

import Todo from "./Todo";

const TodoList = ({ todos, setTodos, filteredTodos }) => {
  const { credentials } = useContext(CredentialsContext);

  useEffect(() => {
    fetch(`http://localhost:5100/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  return (
    <div className={styles.todoContainer}>
      <ul className={styles.todoList}>
        {filteredTodos.map((todo) => (
          <Todo
            setTodos={setTodos}
            todos={todos}
            todo={todo}
            key={todo.id}
            text={todo.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

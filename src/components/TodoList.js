import React from "react";
import styles from "../App.module.css";

import Todo from "./Todo";

const TodoList = ({ todos, setTodos, filteredTodos }) => {
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

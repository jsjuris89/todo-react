import React from "react";
import styles from "../App.module.css";

const Todo = ({ text, todo, todos, setTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
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

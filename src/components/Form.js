import React, { useState } from "react";
import styles from "../App.module.css";

const Form = ({ todos, setTodos, setStatus }) => {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);
    setInputText("");
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form className={styles.form}>
      <input value={inputText} onChange={inputTextHandler} type="text" />
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

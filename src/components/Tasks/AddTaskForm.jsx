import React from "react";
import axios from "axios";
import addIcon from "../../assets/img/plus.svg";
import { useState } from "react";

export default function AddTaskForm({ list, onAddTask }) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    setIsLoading(!isLoading);
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    axios.post("http://localhost:3001/tasks", obj).then(({ data }) => {
      console.log(data);
      onAddTask(list.id, data);
      toggleVisible();
    });
    setIsLoading(!isLoading);
  };

  return (
    <div className="tasks-form">
      {!visibleForm ? (
        <div className="tasks-form__new" onClick={toggleVisible}>
          <img src={addIcon} alt="addIcon" />
          <span>New task</span>
        </div>
      ) : (
        <div className="tasks-form__block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Enter new task"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button onClick={addTask} type="button">
            {!isLoading ? "Add Task" : "Adding Task"}
          </button>
          <button type="button" className="button-grey" onClick={toggleVisible}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

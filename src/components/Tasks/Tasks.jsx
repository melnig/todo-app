import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import "./Tasks.scss";
import pencilIcon from "../../assets/img/pencil.svg";

import axios from "axios";

export default function Tasks({ list, onEditTitle, onAddTask }) {
  const [title, setTitle] = useState("");
  const [isPopup, setIsPopup] = useState(false);

  const editTitle = () => {
    setIsPopup(!isPopup);
    const newTitle = title;
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsPopup(!isPopup);
  };

  return (
    <div className="tasks">
      <h2 className="tasks-title">
        {list.name}{" "}
        <img onClick={editTitle} src={pencilIcon} alt="Pencil icon" />
      </h2>
      {isPopup ? (
        <div className="title-edit">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder={list.name}
          />
          <button onClick={editTitle} type="button">
            Ok
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="tasks-items">
        {!list.tasks.length && <h2>Tasks is empty</h2>}
        {list.tasks.map((task) => (
          <div key={task.id} className="tasks-items__row">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="#000"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </label>
            </div>
            <input className="inputText" value={task.text} readOnly />
          </div>
        ))}
      </div>
      <AddTaskForm list={list} onAddTask={onAddTask} />
    </div>
  );
}

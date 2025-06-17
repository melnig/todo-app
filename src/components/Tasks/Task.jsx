import React from "react";
import axios from "axios";

export default function Task({ task, onDelete, list, onEdit, onComplete }) {
  const onChangeCheckbox = (e) => {
    onComplete(list.id, task.id, e.target.checked);
  };

  return (
    <div key={task.id} className="tasks-items__row">
      <div className="checkbox">
        <input
          id={`task-${task.id}`}
          type="checkbox"
          checked={task.completed}
          onChange={onChangeCheckbox}
        />
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
      <p className="inputText">{task.text}</p>
      <div className="task-btns">
        <button
          onClick={() => onEdit(list.id, { id: task.id, text: task.text })}
        >
          Edit
        </button>
        <button onClick={() => onDelete(list.id, task.id)}>Delete</button>
      </div>
    </div>
  );
}

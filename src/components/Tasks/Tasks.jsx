import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import { Link } from "react-router-dom";
import "./Tasks.scss";
import pencilIcon from "../../assets/img/pencil.svg";

import axios from "axios";

export default function Tasks({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onDeleteTask,
  onEditTask,
  onCompleteTask,
}) {
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
      <Link to={`/lists/${list.id}`} className="tasks-link">
        <h2 style={{ color: list.color.hex }} className="tasks-title">
          {list.name}{" "}
          <img onClick={editTitle} src={pencilIcon} alt="Pencil icon" />
        </h2>
      </Link>
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
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Tasks is empty</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              list={list}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          ))}
      </div>
      <AddTaskForm list={list} onAddTask={onAddTask} key={list.id} />
    </div>
  );
}

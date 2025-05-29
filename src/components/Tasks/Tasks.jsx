import React from "react";
import "./Tasks.scss";
import pencilIcon from "../../assets/img/pencil.svg";

export default function Tasks() {
  return (
    <div className="tasks">
      <h2 className="tasks-title">
        Frontend <img src={pencilIcon} alt="Pencil icon" />
      </h2>
      <div className="tasks-items">
        <div className="tasks-items__row">
          <div className="checkbox">
            <input id="check" type="checkbox" />
            <label htmlFor="check">
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
          <input className="inputText" value="Frontend task" readOnly />
        </div>
      </div>
    </div>
  );
}

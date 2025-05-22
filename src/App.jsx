import React from "react";
import "./App.scss";
import AddButtonList from "./components/AddButtonList/AddButtonList";
import List from "./components/List/List";
import DB from "./assets/db.json";

function App() {
  return (
    <>
      <h1 className="todo-title">TaskFlow</h1>
      <div className="todo">
        <div className="sidebar">
          <List
            items={[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#868686"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                  </svg>
                ),
                name: "All tasks",
                active: true,
              },
            ]}
          />
          <List
            items={[
              {
                color: "green",
                name: "Shopping",
                active: false,
              },
              {
                color: "blue",
                name: "Frontend",
                active: false,
              },
              {
                color: "pink",
                name: "Films",
                active: false,
              },
            ]}
            isRemovable={true}
          />
          <AddButtonList colors={DB.colors} />
        </div>
        <div className="main-content">123</div>
      </div>
    </>
  );
}

export default App;

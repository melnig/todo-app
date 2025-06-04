import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import { AddButtonList, List, Tasks } from "./components";
import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newTasks = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newTasks);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

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
          {lists ? (
            <List
              items={lists}
              onRemove={(id) => {
                const newLists = lists.filter((item) => item.id !== id);
                setLists(newLists);
              }}
              isRemovable
              onClickItem={(item) => {
                setActiveItem(item);
              }}
              activeItem={activeItem}
            />
          ) : (
            "Загрузка..."
          )}
          <AddButtonList onAdd={onAddList} colors={colors} />
        </div>
        <div className="content">
          {lists && activeItem && (
            <Tasks
              list={activeItem && activeItem}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

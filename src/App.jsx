import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import { AddButtonList, List, Tasks } from "./components";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveItem(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (lists) {
      const match = location.pathname.match(/^\/lists\/(\d+)$/);
      if (match) {
        const listId = Number(match[1]);
        const foundList = lists.find((list) => list.id === listId);
        setActiveItem(foundList || null);
      }
    }
  }, [location.pathname, lists]);

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

  const onDeleteTask = (listId, taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }
      return list;
    });

    setLists(newLists);

    axios
      .delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => {
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Enter new task text:", taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newLists = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newLists);
    axios
      .patch(`http://localhost:3001/tasks/${taskObj.id}`, {
        text: newTaskText,
      })
      .then(() => {
        console.log("Task updated successfully");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newLists);
    axios
      .patch(`http://localhost:3001/tasks/${taskId}`, {
        completed,
      })
      .then(() => {
        console.log("Task completion status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating task completion status:", error);
      });
  };

  return (
    <>
      <h1
        onClick={() => {
          navigate("/");
          setActiveItem(null);
        }}
        className="todo-title"
      >
        TaskFlow
      </h1>
      <div className="todo">
        <div className="sidebar scroll-wrapper">
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
                active: location.pathname === "/",
                onClick: () => {
                  setActiveItem(null);
                  navigate("/");
                },
              },
            ]}
          />
          {lists && lists ? (
            <List
              items={lists}
              onRemove={(id) => {
                const newLists = lists.filter((item) => item.id !== id);
                setLists(newLists);
              }}
              isRemovable
              onClickItem={(item) => {
                navigate(`/lists/${item.id}`);
                setActiveItem(item);
              }}
              activeItem={activeItem}
            />
          ) : (
            "Загрузка..."
          )}
          <AddButtonList onAdd={onAddList} colors={colors} />
        </div>
        <div className="content scroll-wrapper">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                lists &&
                lists.map((list) => (
                  <Tasks
                    key={list.id}
                    list={list}
                    onEditTitle={onEditListTitle}
                    onAddTask={onAddTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onCompleteTask={onCompleteTask}
                    withoutEmpty
                  />
                ))
              }
            />
            <Route
              path="/lists/:id"
              element={
                lists &&
                activeItem && (
                  <Tasks
                    list={activeItem}
                    onEditTitle={onEditListTitle}
                    onAddTask={onAddTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onCompleteTask={onCompleteTask}
                  />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

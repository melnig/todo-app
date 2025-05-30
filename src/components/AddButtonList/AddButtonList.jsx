import React from "react";
import { useState, useEffect } from "react";
import "./addButtonList.scss";
import Badge from "../Badge/Badge";
import List from "../List/List";
import axios from "axios";

const AddButtonList = ({ colors, onAdd }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedBadge(colors[0].id);
    }
  }, [colors]);

  const clearPopup = () => {
    setInputValue("");
    setSelectedBadge(colors[0].id);
    setIsPopup(!isPopup);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Enter value");
      return;
    }

    setIsLoading(true);

    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedBadge,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedBadge)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
        clearPopup();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => {
          setIsPopup(true);
        }}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#868686"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
            ),
            name: "Add category",
          },
        ]}
      />
      {isPopup && (
        <div className="add-list__popup">
          <input
            className="field"
            type="text"
            placeholder="Enter new category"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <div className="add-list__colors">
            {colors.map((color, index) => (
              <Badge
                onClick={() => {
                  setSelectedBadge(color.id);
                }}
                key={index}
                color={color.name}
                className={selectedBadge === color.id && "active"}
              />
            ))}
          </div>

          <button type="button" onClick={addList} className="add-list__button">
            {isLoading ? "Adding..." : "Add"}
          </button>

          <span className="close-list">
            <svg
              onClick={clearPopup}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default AddButtonList;

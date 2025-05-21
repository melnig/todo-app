import React from "react";
import "./list.scss";

const List = ({ items }) => {
  return (
    <ul className="sidebar__list">
      {items.map((item, id) => (
        <li key={id} className={item.active ? "active" : ""}>
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <i className={`badge badge--${item.color}`}></i>
            )}
          </i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;

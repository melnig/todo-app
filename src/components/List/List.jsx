import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from "../Badge/Badge";
import deleteIcon from "../../assets/img/x.svg";
import "./list.scss";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeListItem = (item) => {
    if (confirm("Are you sure delete list item?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul onClick={onClick} className="sidebar__list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              onClick={() => removeListItem(item)}
              className="deleteIcon"
              src={deleteIcon}
              alt="deleteIcon"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;

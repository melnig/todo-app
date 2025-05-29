import React from "react";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import "./list.scss";
import deleteIcon from "../../assets/img/x.svg";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeListItem = (item) => {
    if (confirm("Are you sure delete list item?")) {
      console.log(item);
    }
  };
  return (
    <ul onClick={onClick} className="sidebar__list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
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

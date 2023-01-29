import React, { memo } from "react";

import List from "./List";

const Lists = memo(
  ({ lists, onCheckboxClick, onDeleteClick, onPinClick, onMemoClick }) => {
    const pinnedLists = lists
      .filter((list) => list.pinned)
      .map((list) => {
        return (
          <List
            key={list.id}
            id={list.id}
            pinned={list.pinned}
            completed={list.completed}
            title={list.title}
            memo={list.memo}
            onCheckboxClick={onCheckboxClick}
            onDeleteClick={onDeleteClick}
            onPinClick={onPinClick}
            onMemoClick={onMemoClick}
          />
        );
      });
    //   console.log(pinnedLists);

    //   const todoLists = lists
    //     .filter((list) => !list.pinned)
    //     .map((list) => {
    //       return (
    //         <List
    //           key={list.id}
    //           list={list}
    //           onCheckboxClick={onCheckboxClick}
    //           onDeleteClick={onDeleteClick}
    //           onPinClick={onPinClick}
    //         />
    //       );
    //     });

    const todoLists = lists
      .filter((list) => !list.pinned)
      .map((list) => {
        return (
          <List
            key={list.id}
            id={list.id}
            pinned={list.pinned}
            completed={list.completed}
            title={list.title}
            memo={list.memo}
            onCheckboxClick={onCheckboxClick}
            onDeleteClick={onDeleteClick}
            onPinClick={onPinClick}
            onMemoClick={onMemoClick}
          />
        );
      });

    return (
      <div className="Lists">
        <div className="lists-container">
          {pinnedLists.length ? (
            <div className="pinned-lists">
              <ul>{pinnedLists}</ul>
            </div>
          ) : (
            ""
          )}
          <div className="todo-lists">
            <ul>{todoLists}</ul>
          </div>
        </div>
      </div>
    );
  }
);

export default Lists;

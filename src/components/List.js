import React, { useRef, useState, useEffect, memo } from "react";
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import { AiFillPushpin } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { FaStickyNote } from "react-icons/fa";

const List = memo(
  ({
    id,
    pinned,
    completed,
    title,
    memo,
    onCheckboxClick,
    onDeleteClick,
    onPinClick,
    onMemoClick
  }) => {
    // const renders = useRef(0);
    // console.log(id, ++renders.current);

    const [optionsShow, setOptionsShow] = useState(-1);
    const optionsRef = useRef();
    useEffect(() => {
      const closeOptions = (e) => {
        if (
          optionsShow !== -1 &&
          optionsRef.current &&
          !optionsRef.current.contains(e.target)
        ) {
          setOptionsShow(-1);
        }
      };

      document.body.addEventListener("click", closeOptions);

      return () => document.body.removeEventListener("click", closeOptions);
    }, [optionsShow]);

    return (
      <li key={id} className="todo-li">
        {pinned && <AiFillPushpin className="list-pinned" />}
        <div className="checkbox-container">
          <div
            className="checkbox"
            onClick={() => onCheckboxClick(optionsShow === id ? -1 : id)}
          >
            <TiTick
              className="checkbox-tick"
              style={{
                display: completed ? "block" : "none",
              }}
            />
          </div>
        </div>
        <div className="list-text" onClick={() => onMemoClick(id)}>
          <h3 className="list-title">{title}</h3>
          <p className="list-memo">{memo}</p>
        </div>
        <div className="options-container" ref={optionsRef}>
          <div
            className="options-logo-container"
            onClick={() => setOptionsShow(optionsShow === id ? -1 : id)}
          >
            <BsThreeDots className="options-logo" />
          </div>
          <span
            className="options-triangle"
            style={{
              display: optionsShow === id ? "block" : "none",
            }}
          ></span>
          <div
            className="options"
            style={{
              display: optionsShow === id ? "block" : "none",
            }}
          >
            <div className="option" onClick={() => onPinClick(id)}>
              <div className="option-logo-container">
                <AiFillPushpin className="option-logo" />
              </div>

              <p>{pinned ? "Unpin" : "Pin to the top"}</p>
            </div>
            <div className="option" onClick={() => onMemoClick(id)}>
              <div className="option-logo-container">
                <FaStickyNote className="option-logo" />
              </div>

              <p>Add a memo or edit</p>
            </div>
            <div className="option" onClick={() => onDeleteClick(id)}>
              <div className="option-logo-container">
                <BsFillTrashFill className="option-logo" />
              </div>
              <p>Delete</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default List;

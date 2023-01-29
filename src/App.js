import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import { BsListCheck } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Lists from "./components/Lists";

const dayOfWeek = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};
const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const reducer = (state, action) => {
  let updatedLists = state.lists.slice();

  switch (action.type) {
    case "input_change":
      let inputText = state.inputVal;
      if (!inputText) inputText = action.inputVal.toUpperCase();
      else inputText = action.inputVal;
      return { ...state, inputVal: inputText };
    case "handle_submit":
      let submittedVal = state.inputVal.trim();
      if (submittedVal === "") return state;
      submittedVal = submittedVal[0].toUpperCase() + submittedVal.substring(1);
      if (state.lists.some((list) => list.title === submittedVal)) return state;

      const curDate = new Date();
      const newList = {
        title: submittedVal,
        memo: "",
        day: curDate.getDay(),
        dateOfMonth: curDate.getDate(),
        month: curDate.getMonth() + 1,
        year: curDate.getFullYear(),
        completed: false,
        pinned: false,
        id: state.lists.length,
      };
      return { ...state, lists: [newList, ...state.lists], inputVal: "" };
    case "handle_checkbox_click":
      for (let i = 0; i < updatedLists.length; i++) {
        if (action.id === updatedLists[i].id) {
          updatedLists[i].completed = !updatedLists[i].completed;
          break;
        }
      }
      return { ...state, lists: updatedLists };
    case "handle_delete_click":
      updatedLists = updatedLists.filter((list) => list.id !== action.id);
      return { ...state, lists: updatedLists };
    case "handle_pin_click":
      for (let i = 0; i < updatedLists.length; i++) {
        if (updatedLists[i].id === action.id) {
          updatedLists[i].pinned = !updatedLists[i].pinned;
          break;
        }
      }
      return { ...state, lists: updatedLists };
    case "handle_memo_click":
      let chosenList;
      for (let i = 0; i < updatedLists.length; i++) {
        if (updatedLists[i].id === action.id) {
          chosenList = updatedLists[i];
          break;
        }
      }
      return {
        ...state,
        memoTitleVal: chosenList.title,
        memoTextVal: chosenList.memo,
      };

    case "memo_title_change":
      return {
        ...state,
        memoTitleVal: !state.memoTitleVal
          ? action.val.toUpperCase()
          : action.val,
      };

    case "memo_text_change":
      return {
        ...state,
        memoTextVal: !state.memoTextVal ? action.val.toUpperCase() : action.val,
      };

    case "memo_submit":
      for (let i = 0; i < updatedLists.length; i++) {
        if (updatedLists[i].id === action.id) {
          updatedLists[i].title = state.memoTitleVal;
          updatedLists[i].memo = state.memoTextVal;
          break;
        }
      }
      return { ...state, lists: updatedLists };

    case "update_lists_from_storage":
      return { ...state, lists: action.lists };

    default:
      alert("Unknown type");
  }
};

const App = () => {
  const storedLists = JSON.parse(localStorage.getItem("lists"));
  const [inputClicked, setInputClicked] = useState(true);
  const [memoOpen, setMemoOpen] = useState(-1);
  const [{ lists, inputVal, memoTitleVal, memoTextVal }, dispatch] = useReducer(
    reducer,
    {
      lists: storedLists ? storedLists : [],
      inputVal: "",
      memoTitleVal: "",
      memoTextVal: "",
    }
  );

  const renders = useRef(0);
  renders.current++;
  const inputRef = useRef();
  const memoTitleRef = useRef();

  const date = new Date();
  const day = date.getDay();
  const dateOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const handleInputChange = useCallback(
    (e) => {
      // if (!inputVal) setInputVal(e.target.value.toUpperCase());
      // else setInputVal(e.target.value);
      dispatch({ type: "input_change", inputVal: e.target.value });
    },
    [dispatch]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // if (lists.some((list) => list.text === inputVal)) return;
      // const curDate = new Date();
      // const newList = {
      //   text: inputVal,
      //   day: curDate.getDay(),
      //   dateOfMonth: curDate.getDate(),
      //   month: curDate.getMonth() + 1,
      //   year: curDate.getFullYear(),
      //   completed: false,
      //   pinned: false,
      //   id: lists.length,
      // };
      // setLists([newList, ...lists]);
      // setInputVal("");
      dispatch({ type: "handle_submit" });
    },
    [dispatch]
  );
  const handleCheckboxClick = useCallback(
    (id) => {
      // let updatedLists = lists.slice();
      // updatedLists = updatedLists.map((list) => {
      //   if (list.id !== id) return list;
      //   list.completed = !list.completed;
      //   return list;
      // });
      // setLists(updatedLists);
      dispatch({ type: "handle_checkbox_click", id: id });
    },
    [dispatch]
  );
  const handleDeleteClick = useCallback(
    (id) => {
      // let updatedLists = lists.slice();
      // updatedLists = updatedLists.filter((list) => list.id !== id);
      // setLists(updatedLists);
      dispatch({ type: "handle_delete_click", id: id });
    },
    [dispatch]
  );
  const handlePinClick = useCallback(
    (id) => {
      // let updatedLists = lists.slice();
      // for (let i = 0; i < updatedLists.length; i++) {
      //   if (updatedLists[i].id === id) {
      //     updatedLists[i].pinned = !updatedLists[i].pinned;
      //     break;
      //   }
      // }
      // setLists(updatedLists);
      dispatch({ type: "handle_pin_click", id: id });
    },
    [dispatch]
  );
  const handleMemoClick = useCallback((id) => {
    setMemoOpen(id);
    dispatch({ type: "handle_memo_click", id: id });
  }, []);
  const handleMemoTitleChange = useCallback(
    (e) => {
      dispatch({ type: "memo_title_change", val: e.target.value });
    },
    [dispatch]
  );
  const handleMemoTextChange = useCallback(
    (e) => {
      dispatch({ type: "memo_text_change", val: e.target.value });
    },
    [dispatch]
  );
  const handleMemoSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: "memo_submit", id: memoOpen });
      setMemoOpen(-1);
    },
    [dispatch, memoOpen]
  );

  useEffect(() => {
    const inputOutsideClick = (e) => {
      if (
        inputClicked &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setInputClicked(false);
      }
    };
    document.body.addEventListener("click", inputOutsideClick);
    return () => document.body.removeEventListener("click", inputOutsideClick);
  }, [inputClicked]);

  useEffect(() => {
    if (memoTitleRef.current && memoOpen !== -1) {
      memoTitleRef.current.focus();
    }
  }, [memoOpen]);

  if (renders.current !== 1) {
    localStorage.setItem("lists", JSON.stringify(lists));
  }
  
  return (
    <div className="App">
      <div className="App-container">
        <div
          className="memo-container"
          style={{
            display: memoOpen === -1 && "none",
          }}
        >
          <div
            className="memo-background"
            onClick={() => setMemoOpen(-1)}
          ></div>
          <form className="memo" onSubmit={handleMemoSubmit}>
            <div className="memo-close" onClick={() => setMemoOpen(-1)}>
              <AiOutlineCloseCircle />
            </div>
            <label htmlFor="memo-title">List:</label>
            <input
              id="memo-title"
              value={memoTitleVal}
              onChange={handleMemoTitleChange}
              ref={memoTitleRef}
            />
            <label htmlFor="memo-text">Memo:</label>
            <textarea
              id="memo-text"
              value={memoTextVal}
              onChange={handleMemoTextChange}
            />
            <button className="memo-btn" onClick={handleMemoSubmit}>
              Submit
            </button>
          </form>
        </div>
        <div className="app-top">
          <div className="date-container">
            <div className="day-of-week">
              <p>{dayOfWeek[day]}</p>
            </div>
            <div className="month-year">
              <p>
                {months[month]} {dateOfMonth}, {year}
              </p>
            </div>
          </div>
          <form
            className="input-container"
            onSubmit={handleSubmit}
            onClick={() => setInputClicked(true)}
            ref={inputRef}
          >
            <div className="input-logo-container">
              <BsListCheck className="input-logo" />
            </div>
            <input
              className="todo-input"
              placeholder="Add a task"
              value={inputVal}
              onChange={handleInputChange}
              autoFocus
            />
          </form>
        </div>
        <Lists
          lists={lists}
          onCheckboxClick={handleCheckboxClick}
          onDeleteClick={handleDeleteClick}
          onPinClick={handlePinClick}
          onMemoClick={handleMemoClick}
        />
      </div>
    </div>
  );
};

export default App;

import { useState, useEffect, useRef, Fragment } from "react";
import classes from "./MainContainer.module.css";
import light from "../assets/images/Bitmap.svg";
import dark from "../assets/images/darkbackground.svg";
import logo from "../assets/images/TODO.svg";
import moonIcon from "../assets/images/Combined Shape.svg";
import deleteIcon from "../assets/images/Combined Shape 2.svg";
import checkIcon from "../assets/images/Group 3.svg";
import sunIcon from "../assets/images/sun.svg";
// import Button from "./UI/buttons";

const getInitialState = () => {
  const noteList = localStorage.getItem("list");
  return noteList ? JSON.parse(noteList) : [];
};

const MainContainer = () => {
  const [noteList, setNoteList] = useState(getInitialState);
  const [note, setNote] = useState("");
  const [activeNotes, setActiveNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [active, setActive] = useState("All");
  const [checked, setIsChecked] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode" || true));

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(noteList));
    localStorage.setItem("mode", mode);
  }, [noteList, mode]);

  const ChangeModeHandler = () => {
    mode === false ? setMode(true) : setMode(false);
  };

  const CreateElementHandler = (item) => {
    if (item.trim().length >= 0) {
      setNote(item);
    }
  };

  const AddElementHandler = () => {
    if (note) {
      setNoteList((prevState) => {
        return [
          ...prevState,
          {
            el: note,
            id: Math.random().toString(),
            completed: !checked ? false : true,
            isDragging: false,
          },
        ];
      });
    }
    setNote("");
    setIsChecked(false);
  };
  const CompletedTaskHandler = () => {
    if (note) {
      setIsChecked(!checked);
    }
  };
  const DeleteElementHandler = (id) => {
    setNoteList(noteList.filter((el) => el.id !== id));
    setActiveNotes(activeNotes.filter((el) => el.id !== id));
    setCompletedNotes(completedNotes.filter((el) => el.id !== id));
  };

  const AlldeleteHandler = () => {
    setNoteList(noteList.filter((el) => el.completed == false));
  };
  const CompletedNoteHandler = (id) => {
    setNoteList((prevState) => {
      return prevState.map((el) => {
        if (el.id === id) {
          return {
            ...el,

            completed: !el.completed,
          };
        }
        return el;
      });
    });

    setActiveNotes((prevState) => {
      return prevState.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed };
        }
        7;
        return el;
      });
    });
    setCompletedNotes((prevState) => {
      return prevState.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed };
        }
        return el;
      });
    });
  };
  const activenotes = noteList.filter((el) => el.completed == false);

  const ActiveElementHandler = () => {
    setActiveNotes(activenotes);
    setActive("active");
  };

  const AllElementHandler = () => {
    setActive("All");
  };

  const CompletedElementHandler = () => {
    const completed = noteList.filter((el) => el.completed == true);
    setCompletedNotes(completed);
    setActive("completed");
  };

  const allNoteList =
    active === "completed"
      ? completedNotes
      : active === "active"
      ? activeNotes
      : active === "All"
      ? noteList
      : "";

  //DRAG AND DROP
  let dragItem = useRef();
  let dragOverItem = useRef();

  const OnDragStart = (e, index) => {
    dragItem.current = index;
  };

  const OnDragEnter = (e, index) => {
    dragOverItem.current = index;

    const updatedNoteList = noteList.map((item, idx) => ({
      ...item,
      isDragging: idx === index,
    }));

    setNoteList(updatedNoteList);
  };

  const OnDragEnd = () => {
    const updatedNoteList = [...noteList];

    const draggedItem = updatedNoteList[dragItem.current];
    updatedNoteList.splice(dragItem.current, 1);
    updatedNoteList.splice(dragOverItem.current, 0, draggedItem);

    dragItem.current = null;
    dragOverItem.current = null;
    setNoteList(updatedNoteList);
  };
  return (
    <div className={classes["main-container"]}>
      <div className={classes["light-img"]}>
        <img src={!mode ? light : dark}></img>
      </div>
      <div
        className={`${classes["light-mode"]} ${
          mode ? classes["dark-mode"] : ""
        }`}
      >
        <div className={classes.main}>
          <div className={classes.header}>
            <img className={classes.logo} src={logo} alt="logo" />
            {
              <button
                onClick={() => {
                  ChangeModeHandler();
                }}
              >
                <img src={!mode ? moonIcon : sunIcon} alt="moon/sun" />
              </button>
            }
          </div>
          <div
            className={`${classes["input-container"]} ${
              mode ? classes["input-container-dark"] : ""
            }`}
          >
            <button
              className={`${classes["check-box"]} ${
                mode ? classes["check-box-dark"] : ""
              }`}
              onClick={() => CompletedTaskHandler()}
            >
              {!checked ? (
                <div
                  className={`${classes.circle} ${
                    mode ? classes["dark-circle"] : ""
                  }`}
                ></div>
              ) : (
                <img src={checkIcon} alt="check Icon" />
              )}
            </button>

            <input
              className={`${checked ? classes["list-item"] : ""} ${
                mode ? classes["dark-input"] : ""
              }`}
              placeholder="Create a new todo…"
              value={note}
              maxLength={35}
              onKeyDown={(e) => {
                e.key === "Enter" ? AddElementHandler() : "";
              }}
              onChange={(e) => {
                CreateElementHandler(e.target.value);
              }}
            />
          </div>
          <ul className={mode ? classes["dark-ul"] : ""}>
            {allNoteList.map((list, index) => (
              <li
                key={list.id}
                className={`${classes["list-item-container"]} ${
                  mode ? classes["dark-list-item-container"] : ""
                }`}
                draggable
                onDragStart={(e) => {
                  OnDragStart(e, index);
                }}
                onDragEnter={(e) => {
                  OnDragEnter(e, index);
                }}
                onDragEnd={(e) => {
                  OnDragEnd(e, index);
                }}
              >
                <div>
                  <button
                    className={`${classes["check-box"]} ${
                      mode ? classes["check-box-dark"] : ""
                    }`}
                    onClick={() => {
                      CompletedNoteHandler(list.id);
                    }}
                  >
                    {!list.completed ? (
                      <div
                        key={list.id}
                        className={`${classes.circle} ${
                          mode ? classes["dark-circle"] : ""
                        }`}
                      ></div>
                    ) : (
                      <img key={list.id} src={checkIcon} alt="check Icon" />
                    )}
                  </button>
                  <span
                    key={list.id}
                    className={`${
                      list.completed ? classes["iscrossed-light"] : ""
                    }
                    ${mode ? classes["iscrossed-dark"] : ""}
                    `}
                  >
                    {list.el}
                  </span>
                </div>
                <button
                  className={classes.btn}
                  onClick={() => DeleteElementHandler(list.id)}
                >
                  <img src={deleteIcon} alt="delete Icon" />
                </button>
              </li>
            ))}
          </ul>
          {window.innerWidth < 600 ? (
            <Fragment>
              {" "}
              <div
                className={`${classes.completed} ${
                  mode ? classes["dark-completed"] : ""
                }`}
              >
                <span>{activenotes.length} items left</span>
                <button
                  className={mode ? classes["dark-completed-btn"] : ""}
                  onClick={() => {
                    AlldeleteHandler();
                  }}
                >
                  Clear Completed
                </button>
              </div>
              <div
                className={`${classes.footer} ${
                  mode ? classes["dark-footer"] : ""
                }`}
              >
                <button
                  onClick={() => {
                    AllElementHandler();
                  }}
                >
                  All
                </button>
                <button
                  className={mode ? classes["footer-dark-btn"] : ""}
                  onClick={() => {
                    ActiveElementHandler();
                  }}
                >
                  Active
                </button>

                <button
                  className={mode ? classes["footer-dark-btn"] : ""}
                  onClick={() => {
                    CompletedElementHandler();
                  }}
                >
                  Completed
                </button>
              </div>
            </Fragment>
          ) : (
            <div
              className={`${classes.completed} ${
                mode ? classes["dark-completed"] : ""
              }`}
            >
              <span>{activenotes.length} items left</span>

              <button
                onClick={() => {
                  AllElementHandler();
                }}
              >
                All
              </button>
              <button
                className={mode ? classes["footer-dark-btn"] : ""}
                onClick={() => {
                  ActiveElementHandler();
                }}
              >
                Active
              </button>

              <button
                className={mode ? classes["footer-dark-btn"] : ""}
                onClick={() => {
                  CompletedElementHandler();
                }}
              >
                Completed
              </button>
              <button
                className={mode ? classes["dark-completed-btn"] : ""}
                onClick={() => {
                  AlldeleteHandler();
                }}
              >
                Clear Completed
              </button>
            </div>
          )}
          <span
            className={`${classes.drop} ${mode ? classes["dark-drop"] : ""}`}
          >
            Drag and drop to reorder list
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

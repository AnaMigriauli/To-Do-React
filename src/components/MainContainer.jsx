import { useState, useEffect, useRef } from "react";
import classes from "./MainContainer.module.css";
import light from "../assets/images/Bitmap.svg";
import logo from "../assets/images/TODO.svg";
import moon from "../assets/images/Combined Shape.svg";
import deleteIcon from "../assets/images/Combined Shape 2.svg";
import checkIcon from "../assets/images/Group 3.svg";

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

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(noteList));
  }, [noteList]);

  const CreateElementHandler = (item) => {
    if (item.trim().length > 0) {
      setNote(item);
    }
  };

  console.log(note);
  const AddElementHandler = () => {
    if (note) {
      setNoteList((prevState) => {
        return [
          ...prevState,
          {
            el: note,
            id: Math.random().toString(),
            completed: false,
            isDragging: false,
          },
        ];
      });
    }
    setNote("");
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
  console.log(noteList);

  const CompletedTaskHandler = () => {
    if (note) {
      setIsChecked(!checked);
    }
  };

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
        <img src={light}></img>
      </div>
      <div className={classes["light-mode"]}>
        <div className={classes.main}>
          <div className={classes.header}>
            <img src={logo} alt="logo" />
            <img src={moon} alt="moon" />
          </div>
          <div className={classes["input-container"]}>
            <button
              className={classes["check-box"]}
              onClick={() => CompletedTaskHandler()}
            >
              {!checked ? (
                <div className={classes.circle}></div>
              ) : (
                <img src={checkIcon} alt="check Icon" />
              )}
            </button>

            <input
              className={checked ? classes["list-item"] : ""}
              placeholder="Create a new todo…"
              value={note}
              onKeyDown={(e) => {
                e.key === "Enter" ? AddElementHandler() : "";
              }}
              onChange={(e) => {
                CreateElementHandler(e.target.value);
              }}
            />
          </div>
          <ul>
            {active === "completed"
              ? completedNotes.map((list) => (
                  <li key={list.id} className={classes["list-item-container"]}>
                    <div>
                      <button
                        className={classes["check-box"]}
                        onClick={() => {
                          CompletedNoteHandler(list.id);
                        }}
                      >
                        {!list.completed ? (
                          <div key={list.id} className={classes.circle}></div>
                        ) : (
                          <img key={list.id} src={checkIcon} alt="check Icon" />
                        )}
                      </button>
                      <span
                        key={list.id}
                        className={list.completed ? classes["list-item"] : ""}
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
                ))
              : active === "active"
              ? activeNotes.map((list) => (
                  <li key={list.id} className={classes["list-item-container"]}>
                    <div>
                      <button
                        className={classes["check-box"]}
                        onClick={() => {
                          CompletedNoteHandler(list.id);
                        }}
                      >
                        {!list.completed ? (
                          <div key={list.id} className={classes.circle}></div>
                        ) : (
                          <img key={list.id} src={checkIcon} alt="check Icon" />
                        )}
                      </button>
                      <span
                        key={list.id}
                        className={list.isCrossed ? classes["list-item"] : ""}
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
                ))
              : noteList.map((list, index) => (
                  <li
                    key={list.id}
                    className={classes["list-item-container"]}
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
                        className={classes["check-box"]}
                        onClick={() => {
                          CompletedNoteHandler(list.id);
                        }}
                      >
                        {!list.completed ? (
                          <div key={list.id} className={classes.circle}></div>
                        ) : (
                          <img key={list.id} src={checkIcon} alt="check Icon" />
                        )}
                      </button>
                      <span
                        key={list.id}
                        className={list.completed ? classes["list-item"] : ""}
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
          <div className={classes.completed}>
            <span>{activenotes.length} items left</span>
            <button
              onClick={() => {
                AlldeleteHandler();
              }}
            >
              Clear Completed
            </button>
          </div>
          <div className={classes.footer}>
            <button
              onClick={() => {
                AllElementHandler();
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                ActiveElementHandler();
              }}
            >
              Active
            </button>
            <button
              onClick={() => {
                CompletedElementHandler();
              }}
            >
              Completed
            </button>
          </div>
          <span className={classes.drop}>Drag and drop to reorder list</span>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

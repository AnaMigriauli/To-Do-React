import { useState, useEffect } from "react";
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
  const [active, setActive] = useState(false);
  const [completed, setcompleted] = useState(false);
  // const [allElement,setAllElement]=useState(false)

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(noteList));
  }, [noteList]);

  const CreateElementHandler = (item) => {
    if (item.trim().length > 0) {
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
            state: false,
            isCrossed: false,
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
    setNoteList(noteList.filter((el) => el.state == false));
  };
  const CompletedNoteHandler = (id) => {
    setNoteList((prevState) => {
      return prevState.map((el) => {
        if (el.id === id) {
          return { ...el, state: !el.state, isCrossed: !el.isCrossed };
        }
        return el;
      });
    });

    setActiveNotes((prevState) => {
      return prevState.map((el) => {
        if (el.id === id) {
          return { ...el, state: !el.state, isCrossed: !el.isCrossed };
        }
        7;
        return el;
      });
    });
    setCompletedNotes((prevState) => {
      return prevState.map((el) => {
        if (el.id === id) {
          return { ...el, state: !el.state, isCrossed: !el.isCrossed };
        }
        return el;
      });
    });
  };
  const notes = noteList.filter((el) => el.state == false);

  const ActiveElementHandler = () => {
    setActiveNotes(notes);
    setActive(true);
  };

  const AllElementHandler = () => {
    location.reload();
  };

  const CompletedElementHandler = () => {
    const completed = noteList.filter((el) => el.state == true);
    setCompletedNotes(completed);
    setcompleted(true);
  };
  console.log(completed);
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
              onClick={CompletedNoteHandler}
            >
              <div className={classes.circle}></div>

              {/* <img src={checkIcon} alt="check Icon" /> */}
            </button>

            <input
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
            {active
              ? activeNotes.map((list) => (
                  <li key={list.id} className={classes["list-item-container"]}>
                    <div>
                      <button
                        className={classes["check-box"]}
                        onClick={() => {
                          CompletedNoteHandler(list.id);
                        }}
                      >
                        {!list.state ? (
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
              : completed
              ? completedNotes.map((list) => (
                  <li key={list.id} className={classes["list-item-container"]}>
                    <div>
                      <button
                        className={classes["check-box"]}
                        onClick={() => {
                          CompletedNoteHandler(list.id);
                        }}
                      >
                        {!list.state ? (
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
              : noteList.map((list) => (
                  <li key={list.id} className={classes["list-item-container"]}>
                    <div>
                      <button
                        className={classes["check-box"]}
                        onClick={() => {
                          CompletedNoteHandler(list.id);
                        }}
                      >
                        {!list.state ? (
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
                ))}
          </ul>
          <div className={classes.completed}>
            <span>{notes.length} items left</span>
            <button
              onClick={() => {
                AlldeleteHandler();
              }}
            >
              {" "}
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

import { useState, useEffect, Fragment } from "react";
import classes from "./MainContainer.module.css";
import light from "../assets/images/Bitmap.svg";
import dark from "../assets/images/darkbackground.svg";
import Header from "./Header";
import AddNote from "./AddNote";
import Button from "./Button";
import ListItem from "./ListItems";

const getInitialState = () => {
  const noteList = localStorage.getItem("list");
  return noteList ? JSON.parse(noteList) : [];
};

const initialMode = () => {
  const mode = localStorage.getItem("mode");
  console.log(mode);
  return JSON.parse(mode);
};
const MainContainer = () => {
  const [noteList, setNoteList] = useState(getInitialState);
  const [note, setNote] = useState("");
  const [activeNotes, setActiveNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [active, setActive] = useState("All");
  const [checked, setIsChecked] = useState(false);
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    localStorage.setItem("list", noteList && JSON.stringify(noteList));
    localStorage.setItem("mode", mode && JSON.stringify(mode));
  }, [noteList, mode]);

  const ChangeModeHandler = () => {
    setMode((prevMode) => !prevMode);
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
          <Header toggleMode={ChangeModeHandler} mode={mode} />
          <AddNote
            mode={mode}
            completedTaskHandler={CompletedTaskHandler}
            checked={checked}
            note={note}
            addElementHandler={AddElementHandler}
            createElementHandler={CreateElementHandler}
            placeholder="Create a new todo…"
            checkBox={classes["check-box"]}
            checkBoxDark={classes["check-box-dark"]}
            circle={classes.circle}
          />
          <ListItem
            mode={mode}
            deleteElementHandler={DeleteElementHandler}
            completedNoteHandler={CompletedNoteHandler}
            allNoteList={allNoteList}
            noteList={noteList}
            setNoteList={setNoteList}
          />
          {window.innerWidth < 600 ? (
            <Fragment>
              {" "}
              <div
                className={`${classes.completed} ${
                  mode ? classes["dark-completed"] : ""
                }`}
              >
                <span>{activenotes.length} items left</span>

                <Button
                  text="Clear Completed"
                  mode={mode}
                  onclick={AlldeleteHandler}
                  classname={classes["dark-completed-btn"]}
                />
              </div>
              <div
                className={`${classes.footer} ${
                  mode ? classes["dark-footer"] : ""
                }`}
              >
                <Button text="All" onclick={AllElementHandler} />

                <Button
                  text="Active"
                  classname={classes["footer-dark-btn"]}
                  onclick={ActiveElementHandler}
                />
                <Button
                  text=" Completed"
                  onclick={CompletedElementHandler}
                  classname={classes["footer-dark-btn"]}
                />
              </div>
            </Fragment>
          ) : (
            <div
              className={`${classes.completed} ${
                mode ? classes["dark-completed"] : ""
              }`}
            >
              <span>{activenotes.length} items left</span>

              <Button text="All" onclick={AllElementHandler} />

              <Button
                text="Active"
                mode={mode}
                classname={classes["footer-dark-btn"]}
                onclick={ActiveElementHandler}
              />
              <Button
                text="Completed"
                onclick={CompletedElementHandler}
                mode={mode}
                classname={classes["footer-dark-btn"]}
              />
              <Button
                onclick={AlldeleteHandler}
                mode={mode}
                classname={classes["dark-completed-btn"]}
                text="Clear Completed"
              />
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

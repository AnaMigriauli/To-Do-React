import { useState } from "react";
import classes from "./MainContainer.module.css";
import light from "../assets/images/Bitmap.svg";
import logo from "../assets/images/TODO.svg";
import moon from "../assets/images/Combined Shape.svg";
import deleteIcon from "../assets/images/Combined Shape 2.svg";
import checkIcon from "../assets/images/Group 3.svg";

const MainContainer = () => {
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState("");
  const [check, setIsCheck] = useState(false);

  const CreateElementHandler = (item) => {
    if (item.trim().length > 0) {
      setNote(item);
    }
  };

  const AddElementHandler = () => {
    if (note) {
      setNoteList((prevState) => {
        return [...prevState, { el: note, id: Math.random().toString() }];
      });
    }
  };
  const DeleteElementHandler = (id) => {
    setNoteList(noteList.filter((el) => el.id !== id));
  };

  const CompletedNoteHandler = () => {
    setIsCheck((prevState) => !prevState);
  };

  console.log(noteList);
  return (
    <div className={classes["main-container"]}>
      <div className={classes["light-img"]}>
        <img src={light}></img>
      </div>
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
            {!check ? (
              <div className={classes.circle}></div>
            ) : (
              <img src={checkIcon} alt="check Icon" />
            )}
          </button>

          <input
            placeholder="Create a new todo…"
            onKeyDown={(e) => {
              e.key === "Enter" ? AddElementHandler() : "";
            }}
            onChange={(e) => {
              CreateElementHandler(e.target.value);
            }}
          />
        </div>
        <ul>
          {noteList.map((list) => (
            <div key={list.id} className={classes["list-item-container"]}>
              <button
                className={classes["check-box"]}
                onClick={CompletedNoteHandler}
              >
                {!check ? (
                  <div className={classes.circle}></div>
                ) : (
                  <img src={checkIcon} alt="check Icon" />
                )}
              </button>
              <li className={classes["list-item"]}>{list.el}</li>

              <button
                className={classes.btn}
                onClick={() => DeleteElementHandler(list.id)}
              >
                <img src={deleteIcon} alt="delete Icon" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainContainer;

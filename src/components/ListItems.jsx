import { useRef } from "react";
import deleteIcon from "../assets/images/Combined Shape 2.svg";
import CheckBox from "./CheckBox";
import classes from "./ListItems.module.css";
const ListItem = ({
  mode,
  allNoteList,
  noteList,
  setNoteList,
  deleteElementHandler,
  completedNoteHandler,
}) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  //DRAG AND DROP

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
            <CheckBox
              mode={mode}
              completedNoteHandler={() => completedNoteHandler(list.id)}
              list={list.id}
              completed={list.completed}
            />

            <span
              key={list.id}
              className={`${list.completed ? classes["iscrossed-light"] : ""}
          ${mode ? classes["iscrossed-dark"] : ""}
          `}
            >
              {list.el}
            </span>
          </div>
          <button
            className={classes.btn}
            onClick={() => deleteElementHandler(list.id)}
          >
            <img src={deleteIcon} alt="delete Icon" />
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ListItem;

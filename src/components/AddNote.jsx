import classes from "./AddNote.module.css";
import CheckBox from "./CheckBox";

const AddNote = ({
  mode,
  completedTaskHandler,
  checked,
  note,
  addElementHandler,
  createElementHandler,
  placeholder,
}) => {
  return (
    <div
      className={`${classes["input-container"]} ${
        mode ? classes["input-container-dark"] : ""
      }`}
    >
      {/* <button
        className={`${checkBox} ${mode ? checkBoxDark : ""}`}
        onClick={completedTaskHandler}
      >
        {!checked ? (
          <div
            className={`${circle} ${mode ? classes["dark-circle"] : ""}`}
          ></div>
        ) : (
          <img src={checkIcon} alt="check Icon" />
        )}
      </button> */}
      <CheckBox
        completed={checked}
        mode={mode}
        completedNoteHandler={completedTaskHandler}
      />

      <input
        className={`${checked ? classes["list-item"] : ""} ${
          mode ? classes["dark-input"] : ""
        }`}
        placeholder={placeholder}
        value={note}
        maxLength={35}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addElementHandler();
          }
        }}
        onChange={(e) => {
          createElementHandler(e.target.value);
        }}
      />
    </div>
  );
};
export default AddNote;

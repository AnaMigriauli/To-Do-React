import classes from "./CheckBox.module.css";
import checkIcon from "../assets/images/Group 3.svg";
const CheckBox = ({ mode, completedNoteHandler, id, completed }) => {
  return (
    <button
      className={`${classes["check-box"]} ${
        mode ? classes["check-box-dark"] : ""
      }`}
      onClick={completedNoteHandler}
    >
      {!completed ? (
        <div
          key={id}
          className={`${classes.circle} ${mode ? classes["dark-circle"] : ""}`}
        ></div>
      ) : (
        <img key={id} src={checkIcon} alt="check Icon" />
      )}
    </button>
  );
};
export default CheckBox;

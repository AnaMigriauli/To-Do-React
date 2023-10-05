import sunIcon from "../assets/images/sun.svg";
import moonIcon from "../assets/images/Combined Shape.svg";
import logo from "../assets/images/TODO.svg";
import classes from "./Header.module.css";
const Header = ({ toggleMode, mode }) => {
  return (
    <div className={classes.header}>
      <img className={classes.logo} src={logo} alt="logo" />
      <button onClick={toggleMode}>
        <img src={!mode ? moonIcon : sunIcon} alt="moon/sun" />
      </button>
    </div>
  );
};
export default Header;

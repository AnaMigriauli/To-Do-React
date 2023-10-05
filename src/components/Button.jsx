const Button = ({ mode, onclick, classname, text }) => {
  return (
    <button className={`mode ? ${classname} : ""`} onClick={onclick}>
      {text}
    </button>
  );
};
export default Button;

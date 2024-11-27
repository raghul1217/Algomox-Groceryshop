import "../styles/Toggle.css";
import { FaSun, FaMoon } from "react-icons/fa";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check" className="toggle-label">
        {isChecked ? <FaMoon className="icon moon" /> : <FaSun className="icon sun" />}
      </label>
    </div>
  );
};

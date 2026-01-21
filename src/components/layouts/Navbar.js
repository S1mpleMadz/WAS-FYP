import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  // Properties

  // Hooks

  // Context

  // Methods

  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);
  // View
  return (
    <nav>
      <div className="nav-item">
        <NavLink to="/" className={getLinkStyle}>
          Home
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/duties" className={getLinkStyle}>
          Duties
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/modules" className={getLinkStyle}>
          Modules
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/staff" className={getLinkStyle}>
          Staff
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/research" className={getLinkStyle}>
          Research
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

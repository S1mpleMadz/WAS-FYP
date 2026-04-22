import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.js";
import { useRole } from "../auth/useRole.js";
import "./Navbar.css";

function Navbar() {
  const { loggedInUser, logout } = useAuth();
  const { isAdmin, isStaff } = useRole();
  const navigate = useNavigate();

  if (!loggedInUser) return null;

  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-item">
        <NavLink to="/" className={getLinkStyle}>Home</NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/modules" className={getLinkStyle}>Modules</NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/duties" className={getLinkStyle}>Duties</NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/research" className={getLinkStyle}>Research</NavLink>
      </div>
      {isAdmin && (
        <div className="nav-item">
          <NavLink to="/staff" className={getLinkStyle}>Staff</NavLink>
        </div>
      )}
      {isStaff && (
        <div className="nav-item">
          <NavLink to="/leaderboard" className={getLinkStyle}>Leaderboard</NavLink>
        </div>
      )}
      <div className="nav-item nav-item--right">
        <span className="nav-user">{loggedInUser.userEmail}</span>
        <button className="nav-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

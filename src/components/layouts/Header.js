import "./Header.css";
import { useAuth } from "../auth/AuthContext.js";
import Action from "../UI/Actions.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/WAS_Logo.png";

function Header() {
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate("/");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <div className="headerText">
        <h1>Work Allocation System</h1>
      </div>
      <div className="headerActions">
        {loggedInUser && <p className="welcome">Welcome {loggedInUser.UserFirstname}</p>}
        {!loggedInUser ? (
          <Action onClick={handleLogin} showText buttonText="Login" />
        ) : (
          <Action onClick={handleLogout} showText buttonText="Logout" />
        )}
        <img src={logo} className="logo" alt="WAS Logo" />
      </div>
    </header>
  );
}

export default Header;

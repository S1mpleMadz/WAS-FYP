import { Link } from "react-router-dom";
import WASLogo from "../../assets/WAS_Logo.png";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/" className="header-brand">
        <h1>Work Allocation System</h1>
      </Link>
      <img src={WASLogo} alt="WAS Logo" className="header-logo" />
    </header>
  );
}

export default Header;

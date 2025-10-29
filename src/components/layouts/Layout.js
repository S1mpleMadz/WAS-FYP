import Header from "./Header.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

import "./Layout.css";

function Layout(props) {
  // Properties

  // Hooks

  // Context

  // Methods

  // View
  return (
    <div>
      <Header />
      <Navbar />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;

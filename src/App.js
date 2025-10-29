import Layout from "./components/layouts/Layout.js";
import Home from "./components/pages/Home.js";
import Duties from "./components/pages/Duties.js";
import Login from "./components/pages/Login.js";
import Modules from "./components/pages/Modules.js";
import PageNotFound from "./components/pages/404.js";
import SignIn from "./components/pages/SignIn.js";
import Staff from "./components/pages/Staff.js";
import Research from "./components/pages/Research.js";
import "./App.css";

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;

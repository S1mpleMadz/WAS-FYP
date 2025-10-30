import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/duties" element={<Duties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/research" element={<Research />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

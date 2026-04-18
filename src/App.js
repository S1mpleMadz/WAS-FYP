import { AuthProvider, useAuth } from "./components/auth/AuthContext.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";
import Layout from "./components/layouts/Layout.js";
import Home from "./components/pages/Home.js";
import Modules from "./components/pages/Modules.js";
import Staff from "./components/pages/Staff.js";
import Login from "./components/pages/Login.js";
import Duties from "./components/pages/Duties.js";
import UserInformation from "./components/pages/UserInformation.js";
import ModuleInformation from "./components/pages/ModuleInformation.js";
import DutyInformation from "./components/pages/DutyInformation.js";
import PageNotFound from "./components/pages/404.js";
import "./App.css";

const Root = () => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? <Navigate to="/home" /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Root />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules"
              element={
                <ProtectedRoute>
                  <Modules />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute>
                  <Staff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/duties"
              element={
                <ProtectedRoute>
                  <Duties />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserInformation/:userId"
              element={
                <ProtectedRoute>
                  <UserInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ModuleInformation/:moduleId"
              element={
                <ProtectedRoute>
                  <ModuleInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/DutyInformation/:dutyID"
              element={
                <ProtectedRoute>
                  <DutyInformation />
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

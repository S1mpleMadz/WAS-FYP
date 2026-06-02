import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/AuthContext.js";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";
import Layout from "./components/layouts/Layout.js";
import Home from "./components/pages/Home.js";
import Duties from "./components/pages/Duties.js";
import Login from "./components/pages/Login.js";
import Modules from "./components/pages/Modules.js";
import PageNotFound from "./components/pages/404.js";
import SignIn from "./components/pages/SignIn.js";
import Staff from "./components/pages/Staff.js";
import Research from "./components/pages/Research.js";
import Leaderboard from "./components/pages/Leaderboard.js";
import SpecificUserInformation from "./components/entities/MoreUserInfo/UserInfoCard.js";
import SpecificModuleInformation from "./components/entities/MoreModuleInfo/ModuleInfoCard.js";
import SpecificDutyInformation from "./components/entities/MoreDutyInfo/DutyInfoCard.js";
import SpecificResearchInformation from "./components/entities/MoreResearchInfo/ResearchInfoCard.js";
import "./App.css";

const ADMIN_ROLES = [1, 2];
const STAFF_ROLES = [3];

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
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
              path="/modules"
              element={
                <ProtectedRoute>
                  <Modules />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute>
                  <SignIn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/research"
              element={
                <ProtectedRoute>
                  <Research />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                  <Staff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute allowedRoles={[...ADMIN_ROLES, ...STAFF_ROLES]}>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserInformation/:userId"
              element={
                <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                  <SpecificUserInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ModuleInformation/:moduleId"
              element={
                <ProtectedRoute>
                  <SpecificModuleInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/DutyInformation/:dutyId"
              element={
                <ProtectedRoute>
                  <SpecificDutyInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ResearchInformation/:researchId"
              element={
                <ProtectedRoute>
                  <SpecificResearchInformation />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

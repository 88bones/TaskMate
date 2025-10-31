import "./App.css";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import DashBoard from "./pages/DashBoard";
import Task from "./components/Task";
import Team from "./components/Team";
import Project from "./components/Project";
import CreateTask from "./components/CreateTask";
import CreatedTasks from "./components/CreatedTasks";
import { useState } from "react";
import UpdateProject from "./components/UpdateProject";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  const hideNavbarPaths = ["/signin", "/signup", "/dashboard"];

  const hideNavbar = hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* DashBoard */}
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="project" element={<Project />}>
            <Route
              path="update-project/:projectId"
              element={<UpdateProject />}
            />
          </Route>
          <Route path="tasks" element={<Task />}>
            <Route path="create-task/:projectId" element={<CreateTask />} />
          </Route>
          <Route path="team" element={<Team />} />
        </Route>

        {/* Auths */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default AppWrapper;

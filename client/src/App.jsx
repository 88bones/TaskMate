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

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarPaths = [
    "/signin",
    "/signup",
    "/dashboard",
    "/dashboard/",
    "/dashboard/tasks",
    "/dashboard/team",
    "/dashboard/project",
  ];

  // const { firstname, lastname, email, role, _id, signedIn } = useSelector(
  //   (state) => state.user
  // );

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* DashBoard */}
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="project" element={<Project />} />
          <Route path="tasks" element={<Task />} />
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

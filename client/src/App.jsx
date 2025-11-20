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

import DashBoard from "./pages/DashBoard";

import CreateTask from "./components/CreateTask";

import UpdateProject from "./components/UpdateProject";
import ProjectBoard from "./pages/ProjectBoard";
import TimeLine from "./components/TimeLine";
import KanbanBoard from "./components/KanbanBoard";
import UpdateUser from "./components/UpdateUser";
import Profile from "./pages/Profile";
import UpdateTask from "./components/UpdateTask";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  const hideNavbarPaths = ["/signin", "/signup"];

  const hideNavbar = hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        {/* ------Home------ */}
        <Route path="/" element={<Home />} />
        {/* ------Profile------ */}
        <Route path="/profile/:userId/" element={<Profile />}>
          <Route path="edit-user" element={<UpdateUser />} />
        </Route>
        {/* ------DashBoard------ */}
        <Route path="/dashboard" element={<DashBoard />}></Route>
        {/* ------Auths------ */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* ------PROJECT-BOARD------ */}
        <Route path="/project-board/:projectId/" element={<ProjectBoard />}>
          <Route path="timeline" element={<TimeLine />}>
            <Route path="update-project" element={<UpdateProject />} />
          </Route>
          <Route path="kanban" element={<KanbanBoard />}>
            <Route path="create-task/:projectId" element={<CreateTask />} />
            <Route path="update-task/:taskId" element={<UpdateTask />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppWrapper;

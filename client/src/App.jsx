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

  const { firstname, lastname, email, role, _id, signedIn } = useSelector(
    (state) => state.user
  );

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <h1>
        {firstname} {email} {_id}{" "}
      </h1>
    </>
  );
}

export default AppWrapper;

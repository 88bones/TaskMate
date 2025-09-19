import "./App.css";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/SignUp";

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

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default AppWrapper;

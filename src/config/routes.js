import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Dashboard from "../screens/admin_dashboard";
import Home from "../screens/Home";
function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/adminPortal"
            element={<Dashboard heading="Admin Portal" />}
          />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
export default AppRouter;

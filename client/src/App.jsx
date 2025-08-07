

import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error";


function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />

          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />

          </Route>

          <Route path="*" element={<Error />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

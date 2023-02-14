import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router";
import PinInfo from "./pages/PinInfo";
import Profile from "./pages/Profile";
import CreatePin from "./pages/CreatePin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {user} from "./components/auth/CheckUser"
import EditProfile from "./components/editProfile/EditProfile";
import UserProfile from "./pages/UserProfile";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pin/:id" element={<PinInfo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/pin-builder" element={<CreatePin />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

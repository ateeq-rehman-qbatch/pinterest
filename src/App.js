import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import PinInfo from "./pages/PinInfo";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pin/:id" element={<PinInfo />} />
      </Routes>
    </div>
  );
}

export default App;

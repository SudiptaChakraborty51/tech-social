import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import Login from "./pages/Login/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

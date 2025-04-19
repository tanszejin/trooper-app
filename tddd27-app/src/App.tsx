import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Hero from './pages/Hero';
import "./App.css";
import Home from "./pages/Home";
import Trip from "./pages/Trip";

function App() {
  return (
    <Routes>
      <Route index element={<Hero/>} />
      <Route path="/" element={<Hero/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/exampletrip" element={<Trip/>} />
    </Routes>
  );
}

export default App;

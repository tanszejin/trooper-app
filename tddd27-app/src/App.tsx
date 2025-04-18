import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Hero from './pages/Hero';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero/>} />
    </Routes>
  );
}

export default App;

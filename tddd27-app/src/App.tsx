import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Hero from "./pages/Hero";
import Home from "./pages/Home";
import Trip from "./pages/Trip";


function App() {
  // use hooks to get if user is logged in
  const user = true;

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/exampletrip" element={<Trip />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Hero />} />
          <Route path="*" element={<Hero />} />
        </Routes>
      )}
    </>
  );
}

export default App;

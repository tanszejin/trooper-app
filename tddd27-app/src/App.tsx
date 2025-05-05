import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Hero from "./pages/Hero";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import { useAuth } from "./contexts/authContext";


function App() {
  const {userLoggedIn} = useAuth();

  return (
    <>
      {userLoggedIn ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/trip/:tripId" element={<Trip />} />
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

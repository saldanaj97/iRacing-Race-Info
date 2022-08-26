import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeekProvider } from "./contexts/WeekContext";
import { UserProvider } from "./contexts/UserContext";
import Races from "./pages/Races";
import Cars from "./pages/Cars";
import Tracks from "./pages/Tracks";
import Series from "./pages/Series";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <WeekProvider>
        <Router>
          <Routes>
            <Route path='/' exact element={<Races />} />
            <Route path='/cars' exact element={<Cars />} />
            <Route path='/tracks' exact element={<Tracks />} />
            <Route path='/series' exact element={<Series />} />
            <Route path='/login' exact element={<Login />} />
          </Routes>
        </Router>
      </WeekProvider>
    </UserProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeekProvider } from "./contexts/WeekContext";
import Races from "./pages/Races";
import Cars from "./pages/Cars";
import Tracks from "./pages/Tracks";
import Series from "./pages/Series";
import "./App.css";

function App() {
  return (
    <WeekProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<Races />} />
          <Route path='/cars' exact element={<Cars />} />
          <Route path='/tracks' exact element={<Tracks />} />
          <Route path='/series' exact element={<Series />} />
        </Routes>
      </Router>
    </WeekProvider>
  );
}

export default App;

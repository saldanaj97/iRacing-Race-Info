import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeekProvider } from "./contexts/WeekContext";
import RaceDashboard from "./pages/RaceDashboard";
import "./App.css";

function App() {
  return (
    <WeekProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<RaceDashboard />} />
        </Routes>
      </Router>
    </WeekProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeekProvider } from "./contexts/WeekContext";
import { UserProvider } from "./contexts/UserContext";
import Races from "./pages/Races";
import AuthdRaces from "./pages/Authenticated/Races";
import Cars from "./pages/Cars";
import Tracks from "./pages/Tracks";
import Series from "./pages/Series";
import PrivateRoute from "./pages/PrivateRoute";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <WeekProvider>
        <Router>
          <Routes>
            {/* Available to all users */}
            <Route path='/' exact element={<Races />} />

            {/* Only available to authenticated users*/}
            <Route element={<PrivateRoute />}>
              <Route exact path='/races' element={<AuthdRaces />} />
              <Route path='/cars' exact element={<Cars />} />
              <Route path='/tracks' exact element={<Tracks />} />
              <Route path='/series' exact element={<Series />} />
            </Route>
          </Routes>
        </Router>
      </WeekProvider>
    </UserProvider>
  );
}

export default App;

import React from "react";
import { Box } from "@mui/material";
import SearchAndFilterBar from "./components/searchandfilter";

import "./App.css";
import MiniDrawer from "./components/drawer";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
    </Box>
  );
}

export default App;

import React from "react";
import { Box } from "@mui/material";
import SearchAndFilterBar from "./components/searchandfilter";

import "./App.css";
import MiniDrawer from "./components/minidrawer";

function App() {
  return (
    <Box className='page-container' sx={{ display: "flex", justifyContent: "center" }}>
      <MiniDrawer />
      <SearchAndFilterBar />
    </Box>
  );
}

export default App;

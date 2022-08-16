import React from "react";
import { Box, Typography } from "@mui/material";
import SearchAndFilterBar from "./components/searchandfilter";

import "./App.css";
import MiniDrawer from "./components/minidrawer";

function App() {
  return (
    <Box className='page-container' sx={{ display: "flex", justifyContent: "center" }}>
      <MiniDrawer />
      <Box className='main-content-area' sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", margin: "100px 0 50px 0" }}>
        <Typography sx={{ width: "100%", margin: "0px 0px 25px 25px", fontSize: "30px", fontWeight: 700 }}>Weekly</Typography>
        <Box className='search-bar' sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <SearchAndFilterBar />
        </Box>
      </Box>
    </Box>
  );
}

export default App;

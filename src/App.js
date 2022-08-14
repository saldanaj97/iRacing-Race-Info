import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";

function App() {
  return (
    <div className='App'>
      <Paper className='background' elevation={5} sx={{ m: "20% auto", p: "3px", backgroundColor: "#b4213a" }}>
        <Box className='main-container'>Hey</Box>
      </Paper>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import Appheader from "./components/appheader";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className='App'>
      <Paper className='background' elevation={8} sx={{ display: "flex", justifyContent: "flex-end", m: "15% auto", backgroundColor: "#b4213a", borderRadius: "15px" }}>
        <Container className='main-container' sx={{ margin: "3px", padding: "10px", width: "75%" }}>
          <Appheader />
        </Container>
      </Paper>
    </div>
  );
}

export default App;

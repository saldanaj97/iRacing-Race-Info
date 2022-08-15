import React from "react";
import Appheader from "./components/appheader";
import Sidebar from "./components/sidebar";
import { Box, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Paper className='background' elevation={8} sx={{ display: "flex", justifyContent: "flex-end", m: "15% auto", backgroundColor: "#2b2d42", borderRadius: "15px" }}>
        <Sidebar />
        <Container className='main-container' sx={{ margin: "3px", padding: "10px", width: "75%", backgroundColor: "white", borderRadius: "0 15px 15px 0" }}>
          <Appheader />
          <Box sx={{ margin: "15px 0 0 20px", fontWeight: 700, fontSize: "25px" }}>Weekly</Box>
        </Container>
      </Paper>
    </div>
  );
}

export default App;

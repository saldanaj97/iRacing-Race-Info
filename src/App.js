import React from "react";
import Appheader from "./components/appheader";
import Sidebar from "./components/sidebar";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Paper className='background' elevation={8} sx={{ display: "flex", justifyContent: "flex-end", m: "15% auto", backgroundColor: "#b4213a", borderRadius: "15px" }}>
        <Sidebar />
        <Container className='main-container' sx={{ margin: "3px", padding: "10px", width: "75%", backgroundColor: "white", borderRadius: "0 15px 15px 0" }}>
          <Appheader />
        </Container>
      </Paper>
    </div>
  );
}

export default App;

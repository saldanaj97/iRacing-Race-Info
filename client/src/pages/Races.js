import React, { useEffect, useContext } from "react";
import { AppBar, Box, Container, Typography, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WeekContext } from "../contexts/WeekContext";
import { UserContext } from "../contexts/UserContext";
import { FilterProvider } from "../contexts/FilterContext";
import SearchAndFilterBar from "../components/searchandfilter";
import CustomizedMenu from "../components/dropdownmenu";
import Login from "../pages/Login";
import Data from "../components/races";

const Races = () => {
  const { weekNum } = useContext(WeekContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // If the user is signed in, redirect to the authenticated page
  useEffect(() => {
    if (user) navigate("/races");
  });

  return (
    <Box className='page-container' sx={{ display: "flex", justifyContent: "center" }}>
      <AppBar position='fixed' sx={{ backgroundColor: "#2b2d42" }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div' width='100%'>
            Races
          </Typography>
          <Container className='login-container' sx={{ display: "flex", color: "White", justifyContent: "flex-end" }}>
            <Login />
          </Container>
        </Toolbar>
      </AppBar>
      <FilterProvider>
        <Box className='main-content-area' sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", margin: "100px 0 50px 0" }}>
          <Typography sx={{ width: "100%", margin: "0px 0px 25px 25px", fontSize: "30px", fontWeight: 700 }}>Weekly Races</Typography>
          <Box className='search-bar' sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <SearchAndFilterBar />
          </Box>
          <Box className='week-display' sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ width: "100%", margin: "25px 0px 0px 25px", fontSize: "30px", fontWeight: 500 }}>Week {weekNum}</Typography>
            <Box className='week-picker' sx={{ margin: "25px 15px 5px 0px", width: "15%" }}>
              <CustomizedMenu menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} dropdownID={"weekNumber"} />
            </Box>
          </Box>
          <Box className='data-table' sx={{ display: "flex", width: "100%", margin: "10px 0px", justifyContent: "center" }}>
            <Data />
          </Box>
        </Box>
      </FilterProvider>
    </Box>
  );
};

export default Races;

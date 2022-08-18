import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchAndFilterBar from "./components/searchandfilter";

import "./App.css";
import MiniDrawer from "./components/minidrawer";
import Data from "./components/datatable";
import CustomizedMenu from "./components/dropdownmenu";

function App() {
  const [weekNum, setWeekNum] = useState(1);

  return (
    <Box className='page-container' sx={{ display: "flex", justifyContent: "center" }}>
      <MiniDrawer />
      <Box className='main-content-area' sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", margin: "100px 0 50px 0" }}>
        <Typography sx={{ width: "100%", margin: "0px 0px 25px 25px", fontSize: "30px", fontWeight: 700 }}>Weekly</Typography>
        <Box className='search-bar' sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <SearchAndFilterBar />
        </Box>
        <Box className='week-display' sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ width: "100%", margin: "25px 0px 0px 25px", fontSize: "30px", fontWeight: 500 }}>Week {weekNum}</Typography>
          <Box className='week-picker' sx={{ margin: "25px 15px 5px 0px", width: "15%" }}>
            <CustomizedMenu menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} setSelectedValue={setWeekNum} />
          </Box>
        </Box>
        <Box className='data-table' sx={{ display: "flex", width: "100%", margin: "10px 0px", justifyContent: "center" }}>
          <Data week={weekNum} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;

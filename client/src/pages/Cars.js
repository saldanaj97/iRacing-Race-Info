import React from "react";
import { Box, Typography } from "@mui/material";
import NavigationBar from "../components/navigation";
import OwnedCars from "../components/cars";

export default function Cars() {
  return (
    <Box className='page-container' sx={{ display: "flex", justifyContent: "center" }}>
      <NavigationBar title={"Cars"} />
      <Box className='main-content-area' sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", margin: "100px 0 50px 0" }}>
        <Typography sx={{ width: "100%", margin: "0px 0px 25px 25px", fontSize: "30px", fontWeight: 700 }}>Owned Cars</Typography>
        <Box className='owned-cars-container' sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <OwnedCars />
        </Box>
      </Box>
    </Box>
  );
}

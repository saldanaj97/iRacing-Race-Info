import React from "react";
import { Box, Typography } from "@mui/material";
import MiniDrawer from "../components/minidrawer";
import FavoriteTracks from "../components/favoritetracks";

export default function Tracks() {
  return (
    <Box className='page-container' sx={{ display: "flex", justifyContent: "center" }}>
      <MiniDrawer title={"Tracks"} />
      <Box className='main-content-area' sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", margin: "100px 0 50px 0" }}>
        <Typography sx={{ width: "100%", margin: "0px 0px 25px 25px", fontSize: "30px", fontWeight: 700 }}>Owned Tracks</Typography>
        <Box className='favorite-tracks-container' sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <FavoriteTracks />
        </Box>
      </Box>
    </Box>
  );
}

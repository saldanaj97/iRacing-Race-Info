import React from "react";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { Icon } from "@mui/material";
import { GiF1Car } from "react-icons/gi";
import { FaFlagCheckered } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { GiRoad } from "react-icons/gi";

const Sidebar = () => {
  // Sidebar options will be used hold the different options that will be available on the side panel
  const sidebarOptions = {
    races: "Races",
    cars: "Cars",
    series: "Series",
    tracks: "Tracks",
    results: "Results",
  };

  // These icons will coinside with the sidebar options from above
  const sideBarIcons = [FaFlagCheckered, GiF1Car, BsCardChecklist, GiRoad, AiOutlineLineChart];

  return (
    <Container disableGutters='true' className='sidebar' sx={{ display: "flex", flexDirection: "column", backgroundColor: "#2b2d42", width: "25%", borderRadius: "15px" }}>
      <Box className='site-title' sx={{ display: "flex", fontSize: "20px", fontWeight: "700", height: "10%", color: "white", justifyContent: "center", marginTop: "15px", paddingTop: "10px" }}>
        iRacing Season Lineup
      </Box>
      <Box className='menu-options'>
        {Object.values(sidebarOptions).map((option, i) => {
          return (
            <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "15px" }}>
              <Box className='icon' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "white" }}>
                <Icon as={sideBarIcons[i]} />
              </Box>
              <Box className='menu-options' key={i} sx={{ display: "flex", margin: "15px", fontSize: "16px", fontWeight: "500", color: "white" }}>
                {option}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default Sidebar;

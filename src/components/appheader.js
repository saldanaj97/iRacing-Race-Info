import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

const AppHeader = () => {
  return (
    <AppBar position='static' elevation={8} sx={{ flexDirection: "row", backgroundColor: "white", borderRadius: "15px", height: "10%" }}>
      <Container disableGutters='true' maxWidth='xl' sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <Container className='title' sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontSize: "20px", fontWeight: 600, color: "black" }}>Races</Typography>
        </Container>

        <Container sx={{ display: "flex", color: "Black", justifyContent: "flex-end" }}>Ricky Bobby</Container>
        <IconButton className='avatar-button' sx={{ display: "flex", alignContent: "flex-end" }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Container>
    </AppBar>
  );
};
export default AppHeader;

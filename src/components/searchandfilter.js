import React from "react";
import { Container } from "@mui/system";
import { Box, FormControl, Paper, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedMenu from "./dropdownFilterMenu";

const SearchAndFilterBar = () => {
  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%" }}>
      <Container className='search-and-filter-container' sx={{ display: "flex", flexDirection: "row" }}>
        <Box className='search-bar' sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>Looking for a particular series?</Box>
          <FormControl sx={{ width: "90%", marginBottom: "25px" }}>
            <TextField
              id='series-search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              label='Series'
              size='small'
            />
          </FormControl>
        </Box>
        <Box className='catergory-dropdown' sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>Category</Box>
          <CustomizedMenu menuItems={["All", "Road", "Oval", "RX", "Dirt"]} />
        </Box>
        <Box className='license-dropdown' sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>License</Box>
          <CustomizedMenu menuItems={["All", "A", "B", "C", "D", "R"]} />
        </Box>
        <Box className='license-dropdown' sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>Owned</Box>
          <CustomizedMenu menuItems={["All", "Owned", "Not Owned"]} />
        </Box>
        <Box className='filter-button' sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Button variant='contained' sx={{ backgroundColor: "#2b2d42", height: "40%" }}>
            Filter
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default SearchAndFilterBar;

import React, { useContext } from "react";
import { Container } from "@mui/system";
import { Box, FormControl, Paper, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedMenu from "./dropdownmenu";
import { FilterContext } from "../contexts/FilterContext";

const SearchAndFilterBar = () => {
  // Import the filter contexts needed
  const { setSearchBarText } = useContext(FilterContext);

  /* Function that will handle setting the search text context on change
     Parameters: searchQuery - the text entered in the search box
     Returns: N/A
  */
  const handleSearchBarText = (event) => {
    // First convert the text to lowercase
    let lowerCaseQuery = event.target.value.toLowerCase();

    // Update the global state
    setSearchBarText(lowerCaseQuery);
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%" }}>
      <Box className='search-and-filter-container' sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "0px 15px" }}>
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
              onChange={handleSearchBarText}
            />
          </FormControl>
        </Box>
        <Box className='catergory-dropdown' sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>Category</Box>
          <CustomizedMenu menuItems={["All", "Road", "Oval", "RX", "Dirt"]} dropdownID={"categoryFilter"} />
        </Box>
        <Box className='license-dropdown' sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>License</Box>
          <CustomizedMenu menuItems={["All", "A", "B", "C", "D", "R"]} dropdownID={"licenseFilter"} />
        </Box>
        <Box className='license-dropdown' sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Box sx={{ margin: "15px 0px", color: "black", fontWeight: "500" }}>Owned</Box>
          <CustomizedMenu menuItems={["Both", "Yes", "No"]} dropdownID={"ownedContentFilter"} />
        </Box>
        <Box className='filter-button' sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "20px 0px 0px 0px" }}>
          <Button variant='contained' sx={{ backgroundColor: "#2b2d42", height: "40%" }}>
            Filter
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchAndFilterBar;

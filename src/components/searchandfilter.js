import React from "react";
import { Container } from "@mui/system";
import { Box, FormControl, Paper, TextField, InputAdornment, InputLabel, FilledInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchAndFilterBar = () => {
  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "90%", marginTop: "150px" }}>
      <Container className='search-and-filter-container' sx={{ display: "flex", flexDirection: "row" }}>
        <Box className='search-bar' sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ margin: "15px 0 15px 0", color: "black", fontWeight: "500" }}>Looking for a particular series?</Box>
          <FormControl sx={{ width: "125%" }}>
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
      </Container>
    </Paper>
  );
};

export default SearchAndFilterBar;

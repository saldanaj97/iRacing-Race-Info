import React from "react";
import { Box, Checkbox, Paper, FormGroup, FormControlLabel } from "@mui/material";
import SeriesData from "../data/series.json";

export default function FavoriteSeries() {
  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  /* Function that will handle when a user selects a checkbox
      Parameters: series - the series id of the box selected; selected - true or false depending on if box is checked or not
      Returns: N/A
    */
  const handleSeriesSelected = (series, selected) => {
    console.log(series, selected);
  };

  /* Function that will gather all the series data including id, name, and category
      Parameters: N/A
      Returns: List of all the series
    */
  const getSeriesData = () => {
    let seriesList = [];
    Object.values(SeriesData).forEach((series) => {
      seriesList.push({ id: series.series_id, name: series.series_name, category: series.category });
    });
    return seriesList;
  };

  /* Function that will organize the series into checkboxes based on their categories
      Parameters: category - the category of races/series we are looking for 
      Returns: List of all the series checkboxes for a particular category 
    */
  const categorizeSeriesData = (category) => {
    let seriesData = getSeriesData();
    let categorizedSeriesData = seriesData.map((series) => {
      if (series.category === category) {
        return <FormControlLabel key={series.id} value={series.id} control={<Checkbox />} label={series.name} onChange={(e) => handleSeriesSelected(e.target.value, e.target.checked)} />;
      }
    });
    return categorizedSeriesData;
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "75%", display: "flex", direction: "column" }}>
      <Box className='cars-owned-container' sx={{ display: "flex", alignContent: "center", width: "100%", justifyContent: "space-evenly", margin: "20px 15px" }}>
        {types.map((category) => {
          return (
            <Box sx={{ fontWeight: "bold", fontSize: "23px" }}>
              {typesFormatted[category]}
              <FormGroup sx={{ fontWeight: "normal", fontSize: "18px" }}>{categorizeSeriesData(category)}</FormGroup>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

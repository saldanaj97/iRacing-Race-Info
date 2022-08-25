import React from "react";
import { Box, Checkbox, Paper, FormGroup, FormControlLabel } from "@mui/material";
import SeriesData from "../data/current-season-available-series.json";

export default function FavoriteSeries() {
  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  const handleSeriesSelected = (series, selected) => {
    console.log(series, selected);
  };

  const getSeriesData = () => {
    let seriesList = [];
    Object.values(SeriesData).forEach((series) => {
      let seriesData = new Object();
      seriesData.id = series.series_id;
      seriesData.name = series.series_name;
      seriesData.category = series.category;
      seriesList.push(seriesData);
    });
    return seriesList;
  };

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

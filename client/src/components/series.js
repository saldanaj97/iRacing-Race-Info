import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Box, Button, Checkbox, Paper, FormGroup, FormControlLabel } from "@mui/material";
import SeriesData from "../data/series.json";
import { UserContext } from "../contexts/UserContext";
import { getUserFavoritedSeries } from "../services/Services";

export default function FavoriteSeries() {
  // Global user data
  const { user } = useContext(UserContext);

  // State for user favorited series
  const [usersFavoriteSeries, setUsersFavoriteSeries] = useState(new Map());

  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  useEffect(() => {
    loadFavoriteSeries();
  }, []);

  /*  Function that will handle calling the backend to get the users favorite series
      Parameters: N/A
      Returns: N/A
  */
  const loadFavoriteSeries = async () => {
    const series = await getUserFavoritedSeries(user);
    setUsersFavoriteSeries(new Map(series));
  };

  /* Function that will handle when a user selects a checkbox
      Parameters: series - the series id of the box selected; selected - true or false depending on if box is checked or not
      Returns: N/A
    */
  const handleSeriesSelected = (series, selected) => {
    let updatedFavorites = usersFavoriteSeries.set(parseInt(series), selected);
    setUsersFavoriteSeries(new Map(updatedFavorites));
  };

  /* Function that will gather all the series data including id, name, and category
      Parameters: N/A
      Returns: List of all the series
    */
  const getSeriesData = (user) => {
    let seriesList = [];
    Object.values(SeriesData).forEach((series) => {
      // Set the favorite series map to false
      if (usersFavoriteSeries.size == 0) {
        usersFavoriteSeries.set(series.series_id, false);
      }

      // Add the series data to the series list
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
        return <FormControlLabel key={series.id} value={series.id} control={<Checkbox />} checked={usersFavoriteSeries.get(series.id) || false} label={series.name} onChange={(e) => handleSeriesSelected(e.target.value, e.target.checked)} />;
      }
    });
    return categorizedSeriesData;
  };

  /* Function that will send a request to the DB notifying them of filter updates
      Parameters: N/A
      Returns: N/A
    */
  const onFilterUpdate = async (event) => {
    try {
      const body = { user: user, series: Object.fromEntries(usersFavoriteSeries) };
      const response = await Axios.post("http://localhost:3001/users-content/update-favorite-series", body, { withCredentials: true }).then((response) => {
        if (response.status == 200) alert(response.data.message); // TODO: Make notification look nicer
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "75%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant='contained' sx={{ backgroundColor: "#2b2d42", height: "70%", margin: "15px 0px" }} onClick={onFilterUpdate}>
          Update
        </Button>
      </Box>
      <Box className='cars-owned-container' sx={{ display: "flex", alignContent: "center", width: "100%", justifyContent: "space-evenly", margin: "20px 15px" }}>
        {types.map((category) => {
          return (
            <Box key={category} sx={{ fontWeight: "bold", fontSize: "23px" }}>
              {typesFormatted[category]}
              <FormGroup sx={{ fontWeight: "normal", fontSize: "18px" }}>{categorizeSeriesData(category)}</FormGroup>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

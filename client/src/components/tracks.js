import React from "react";
import { Box, Checkbox, Paper, FormGroup, FormControlLabel } from "@mui/material";
import Tracks from "../data/tracks.json";

export default function FavoriteTracks() {
  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  /* Function that will handle a user selected a track
      Parameters: track - the id of the track selected; selected - bool indicating whether box was checked or unchecked
      Returns: N/A
  */
  const handleTrackSelected = (track, selected) => {
    console.log(track, selected);
  };

  /* Function that will gather the track data from the json 
      Parameters: N/A
      Returns: List of tracks with their id, name, and category
  */
  const getTracks = () => {
    let trackData = [];
    Object.values(Tracks).forEach((trackInfo) => {
      trackData.push({ id: trackInfo.id, name: trackInfo.name, category: trackInfo.category });
    });
    return trackData;
  };

  /* Function that display the tracks based on their category
      Parameters: category - the category of tracks we are looking for
      Returns: list of checkboxes with each track 
  */
  const categorizeTracks = (category) => {
    let tracks = getTracks();
    let tracksCategorized = tracks.map((track) => {
      if (track.category === category) return <FormControlLabel key={track.id} value={track.id} control={<Checkbox />} label={track.name} onChange={(e) => handleTrackSelected(e.target.value, e.target.checked)} />;
    });
    return tracksCategorized;
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "75%", display: "flex", direction: "column" }}>
      <Box className='cars-owned-container' sx={{ display: "flex", alignContent: "center", width: "100%", justifyContent: "space-evenly", margin: "20px 15px" }}>
        {types.map((category) => {
          return (
            <Box sx={{ fontWeight: "bold", fontSize: "23px" }}>
              {typesFormatted[category]}
              <FormGroup sx={{ fontWeight: "normal", fontSize: "18px" }}>{categorizeTracks(category)}</FormGroup>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Box, Button, Checkbox, Paper, FormGroup, FormControlLabel } from "@mui/material";
import Tracks from "../data/tracks.json";
import { UserContext } from "../contexts/UserContext";
import { getUserOwnedTracks } from "../services/Services";

export default function FavoriteTracks() {
  // Global user data
  const { user } = useContext(UserContext);

  // State for owned tracks filters
  const [ownedTracks, setOwnedTracks] = useState(new Map());

  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  useEffect(() => {
    retrieveUserTracks();
  }, []);

  /*  Function that will handle calling the backend to get the users favorite series
      Parameters: N/A
      Returns: N/A
  */
  const retrieveUserTracks = async () => {
    let tracks = await getUserOwnedTracks(user);
    setOwnedTracks(new Map(tracks));
  };

  /*  Function that will handle a user selected a track
      Parameters: track - the id of the track selected; selected - bool indicating whether box was checked or unchecked
      Returns: N/A
  */
  const handleTrackSelected = (track, selected) => {
    let updatedTracks = ownedTracks.set(parseInt(track), selected);
    setOwnedTracks(new Map(updatedTracks));
  };

  /*  Function that will gather the track data from the json 
      Parameters: N/A
      Returns: List of tracks with their id, name, and category
  */
  const getTracks = () => {
    let trackData = [];
    Object.values(Tracks).forEach((trackInfo) => {
      // Add the track data to the track data list
      trackData.push({ id: trackInfo.id, name: trackInfo.name, category: trackInfo.category });
    });

    return trackData;
  };

  /*  Function that display the tracks based on their category
      Parameters: category - the category of tracks we are looking for
      Returns: list of checkboxes with each track 
  */
  const categorizeTracks = (category) => {
    let tracks = getTracks();
    let tracksCategorized = tracks.map((track) => {
      if (track.category === category)
        return <FormControlLabel key={track.id} value={track.id} control={<Checkbox />} checked={ownedTracks.get(track.id) || false} label={track.name} onChange={(e) => handleTrackSelected(e.target.value, e.target.checked)} />;
    });
    return tracksCategorized;
  };

  /*  Function that will send a request to the DB notifying them of filter updates
      Parameters: N/A
      Returns: N/A
    */
  const onFilterUpdate = async (event) => {
    try {
      const body = { user: user, tracks: Object.fromEntries(ownedTracks) };
      const response = await Axios.post("http://localhost:3001/users-content/update-owned-tracks", body, { withCredentials: true }).then((response) => {
        if (response.status == 200) alert(response.data.message); // TODO: Make notification look nicer
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "75%", display: "flex", direction: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onFilterUpdate}>Update</Button>
      </Box>
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

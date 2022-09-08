import React, { useContext } from "react";
import Axios from "axios";
import { UserContext } from "../contexts/UserContext";

const apiURL = "http://iracing-race-info-production.up.railway.app";

/*  Function to handle the get owned cars api call
    Parameters:user - global user obj containing info needed for reqs; userOwnedCars - map containing all of the cars and if the user owns them or not
    Returns: N/A
*/
export const getUserOwnedCars = async (user) => {
  let ownedCarMap = new Map();
  try {
    const body = { user: user };
    const response = await Axios.post(`${apiURL}/users-content/owned-cars`, body, { withCredentials: true });
    const { ownedCars } = response.data;
    Object.keys(ownedCars).forEach((car) => {
      ownedCarMap.set(parseInt(car), ownedCars[car]);
    });
    return ownedCarMap;
  } catch (error) {
    console.log(error);
  }
};

/*  Function to handle the api for call getting a users owned tracks
    Parameters:user - global user obj containing info needed for reqs; ownedTracks - map containing all of the tracks and if the user owns them or not
    Returns: N/A
*/
export const getUserOwnedTracks = async (user) => {
  let tracks = new Map();
  try {
    const body = { user: user };
    const response = await Axios.post(`${apiURL}/users-content/owned-tracks`, body, { withCredentials: true });
    const { ownedTracks } = response.data;
    Object.keys(ownedTracks).forEach((track) => {
      tracks.set(parseInt(track), ownedTracks[track]);
    });
    return tracks;
  } catch (error) {
    console.log(error);
  }
};

/*  Function to handle the api for call getting a users favorited series
    Parameters:user - global user obj containing info needed for reqs; favoriteSeries - map containing all of the series the users favorites
    Returns: N/A
*/
export const getUserFavoritedSeries = async (user) => {
  let favorites = new Map();
  try {
    const body = { user: user };
    const response = await Axios.post(`${apiURL}/users-content/favorite-series`, body, { withCredentials: true });
    const { favoriteSeries } = response.data;
    Object.keys(favoriteSeries).forEach((series) => {
      favorites.set(parseInt(series), favoriteSeries[series]);
    });
    return favorites;
  } catch (error) {
    console.log(error);
  }
};

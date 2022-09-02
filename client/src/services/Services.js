import React, { useContext } from "react";
import Axios from "axios";
import { UserContext } from "../contexts/UserContext";

/*  Function to handle the get owned cars api call
    Parameters:user - global user obj containing info needed for reqs; userOwnedCars - map containing all of the cars and if the user owns them or not
    Returns: N/A
*/
export const getUserOwnedCars = async (user, userOwnedCars) => {
  try {
    const body = { user: user };
    const response = await Axios.post("http://localhost:3001/users-content/owned-cars", body, { withCredentials: true });
    const { ownedCars } = response.data;
    Object.keys(ownedCars).forEach((car) => {
      userOwnedCars.set(parseInt(car), ownedCars[car]);
    });
  } catch (error) {
    console.log(error);
  }
};

/*  Function to handle the api for call getting a users owned tracks
    Parameters:user - global user obj containing info needed for reqs; ownedTracks - map containing all of the tracks and if the user owns them or not
    Returns: N/A
*/
export const getUserOwnedTracks = async (user) => {
  try {
    const body = { user: user };
    const response = await Axios.post("http://localhost:3001/users-content/owned-tracks", body, { withCredentials: true });
    const { ownedTracks } = response.data;
    /*     Object.keys(ownedCars).forEach((car) => {
      userOwnedCars.set(parseInt(car), ownedCars[car]);
    }); */
    return ownedTracks;
  } catch (error) {
    console.log(error);
  }
};

/*  Function to handle the api for call getting a users favorited series
    Parameters:user - global user obj containing info needed for reqs; favoriteSeries - map containing all of the series the users favorites
    Returns: N/A
*/
export const getUserFavoritedSeries = async (user) => {
  try {
    const body = { user: user };
    const response = await Axios.post("http://localhost:3001/users-content/favorite-series", body, { withCredentials: true });
    const { favoriteSeries } = response.data;
    return favoriteSeries;
  } catch (error) {
    console.log(error);
  }
};

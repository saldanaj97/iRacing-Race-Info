import Axios from "axios";

const apiURL = "http://localhost:3001";

/*  Function to handle the get owned cars api call
    Parameters:user - global user obj containing info needed for reqs; userOwnedCars - map containing all of the cars and if the user owns them or not
    Returns: N/A
*/
export const getUserOwnedCars = async (user) => {
  let ownedCarMap = new Map();
  try {
    const body = { user: user };
    const response = await Axios.post(`${apiURL}/users-content/owned-cars/`, body, { withCredentials: true });
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
    const response = await Axios.post(`${apiURL}/users-content/owned-tracks/`, body, { withCredentials: true });
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
    const response = await Axios.post(`${apiURL}/users-content/favorite-series/`, body, { withCredentials: true });
    const { favoriteSeries } = response.data;
    Object.keys(favoriteSeries).forEach((series) => {
      favorites.set(parseInt(series), favoriteSeries[series]);
    });
    return favorites;
  } catch (error) {
    console.log(error);
  }
};

/*  Function that will send a request to the DB notifying them of car filter updates
    Parameters: user - the user obj containing info about the current user; ownedCars - list of the cars w/ id and bool 
    Returns: N/A
*/
export const updateCarsFilter = async (user, ownedCars) => {
  try {
    const body = { user: user, cars: Object.fromEntries(ownedCars) };
    const response = await Axios.post(`${apiURL}/users-content/update-owned-cars/`, body, { withCredentials: true }).then((response) => {
      if (response.status === 200) alert(response.data.message); // TODO: Make notification look nicer
    });
  } catch (error) {
    console.log(error);
  }
};

/*  Function that will send a request to the DB notifying them of series filter updates
    Parameters: user - user obj containing info about the user logged in; usersFavoriteSeries - list w/ series id and bool 
    Returns: N/A
*/
export const updateSeriesFilter = async (user, usersFavoriteSeries) => {
  try {
    const body = { user: user, series: Object.fromEntries(usersFavoriteSeries) };
    const response = await Axios.post(`${apiURL}/users-content/update-favorite-series/`, body, { withCredentials: true }).then((response) => {
      if (response.status === 200) alert(response.data.message); // TODO: Make notification look nicer
    });
  } catch (error) {
    console.log(error);
  }
};

/*  Function that will send a request to the DB notifying them of track filter updates
      Parameters: user - user obj containing info about the user; ownedTracks - list of track ids w/ bool of whether its owned or not
      Returns: N/A
  */
export const updateOwnedTracks = async (user, ownedTracks) => {
  try {
    const body = { user: user, tracks: Object.fromEntries(ownedTracks) };
    const response = await Axios.post(`${apiURL}/users-content/update-owned-tracks/`, body, { withCredentials: true }).then((response) => {
      if (response.status === 200) alert(response.data.message); // TODO: Make notification look nicer
    });
  } catch (error) {
    console.log(error);
  }
};

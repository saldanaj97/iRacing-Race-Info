import Axios from "axios";
import dotenv from "dotenv";
import CryptoJs from "crypto-js";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import fs from "fs";

// Path for the .env file while in development
dotenv.config({ path: "../.env" });

// Save the cookie-jar for every req
const jar = new CookieJar();
const client = wrapper(
  Axios.create({
    jar,
  })
);

/* Function that will authenticate with iRacing API for any subsequent requests
   Params: N/A
   Returns: Returns a token for the cookie-jar
*/
const fetchAuthCookie = async () => {
  const iRacingEmail = process.env.USERNAME;
  const iRacingPassword = process.env.PASSWORD;

  // Hash the password as instructed from iRacing team here: https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
  var hash = CryptoJs.SHA256(iRacingPassword + iRacingEmail.toLowerCase());
  var hashInBase64 = CryptoJs.enc.Base64.stringify(hash);

  // Make the request to the link provided in the docs and retrieve the cookie data for subsequent requests
  try {
    const URL = "https://members-ng.iracing.com/auth";
    const { data } = await client.post(URL, { email: iRacingEmail, password: hashInBase64 });
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* Function to get series data for a specific year and season
   Params:
    year(string) - the year we are trying to get data for 
    season(string) - the quarter of the season/year 
   Return: Basic data about a specific series using year and quarter
*/
const getCertainSeriesData = async (year, quarter) => {
  try {
    // Make the request to the season link provided in the docs at: https://members-ng.iracing.com/data/doc/series
    const URL = `https://members-ng.iracing.com/data/season/list?season_year=${year}&season_quarter=${quarter}`;

    // Get the link we need for the data as stated in the docs
    const { link } = await client.get(URL).then((response) => response.data);

    // Get all the series in the season
    const { seasons } = await client.get(link).then((response) => response.data);
    return seasons;
  } catch (error) {
    console.log(error);
  }
};

/* Function to get series data for the current year and season (not as much detail as the get series data function)
   Params: N/A
   Returns: BASIC data about every active series in this season
*/
const getSeriesData = async () => {
  try {
    const URL = `https://members-ng.iracing.com/data/series/get`;
    const { link } = await client.get(URL).then((response) => response.data);
    const { data } = await client.get(link).then((response) => response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* Function that will grab all the data for every series running this season
   Params: N/A
   Returns: A list containing DETAILED data about each series in this season 
*/
const getSeasonSeriesData = async () => {
  // seriesData will be used to hold info about each series
  let seriesData = [];

  try {
    const URL = "https://members-ng.iracing.com/data/series/seasons?include_series=1";
    const { link } = await client.get(URL).then((response) => response.data);

    // Organize the data we need from the response
    await client.get(link).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        var series = new Object();
        series.season_id = response.data[i]["schedules"][0]["season_id"];
        series.series_id = response.data[i]["schedules"][0]["series_id"];
        series.series_name = response.data[i]["schedules"][0]["series_name"];
        series.car_class_ids = response.data[i]["car_class_ids"];
        series.track_type = response.data[i]["track_types"][0]["track_type"];
        series.fixed_setup = response.data[i]["fixed_setup"];
        series.official = response.data[i]["official"];
        series.license_group = response.data[i]["license_group"];

        // Variable to hold the schedule for a series
        let seriesSchedule = [];
        for (let j = 0; j < response.data[i]["schedules"].length; j++) {
          var schedule = new Object();
          schedule.race_week_num = response.data[i]["schedules"][j]["race_week_num"];
          schedule.race_lap_limit = response.data[i]["schedules"][j]["race_lap_limit"];
          schedule.race_time_limit = response.data[i]["schedules"][j]["race_time_limit"];
          schedule.session_start_data = response.data[i]["schedules"][j]["race_time_descriptors"];
          schedule.track = response.data[i]["schedules"][j]["track"];
          seriesSchedule.push(schedule);
        }

        // Assign the seriesSchedule to the series object
        series.schedule = seriesSchedule;

        // Push the data from series obj to the seriesData obj
        seriesData.push(series);
      }
    });

    // Change
    return seriesData;
  } catch (error) {
    console.log(error);
  }
};

/* Function that will grab all the data for the cars 
   Params: N/A
   Returns: A list containing each cars id and the corresponding vehicle in natural language 
*/
const getCarData = async () => {
  const carData = [];
  try {
    const URL = "https://members-ng.iracing.com/data/carclass/get";
    const { link } = await client.get(URL).then((response) => response.data);

    await client.get(link).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let carClass = new Object();
        carClass.id = response.data[i]["car_class_id"];
        carClass.name = response.data[i]["name"];
        carClass.shortName = response.data[i]["short_name"];
        carData.push(carClass);
      }
    });
    return carData;
  } catch (error) {
    console.log(error);
  }
};

/* Function that will grab all the tracks available
   Params: N/A
   Returns: A list containing each track with its id, name, and category 
*/
const getTrackData = async () => {
  const trackData = [];
  let seen = [];
  try {
    const URL = "https://members-ng.iracing.com/data/track/get";
    const { link } = await client.get(URL).then((response) => response.data);

    await client.get(link).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let trackObj = new Object();
        if (!seen.includes(response.data[i].track_name)) {
          seen.push(response.data[i].track_name);
          trackObj.id = response.data[i].track_id;
          trackObj.name = response.data[i].track_name;
          trackObj.category = response.data[i].category;
          trackData.push(trackObj);
        }
      }
    });
    return trackData;
  } catch (error) {
    console.log(error);
  }
};

/* Function to write JSON data to specified file.
   Params:
    jsonData(string) - the data that will be written to the file
    fileName(string) - what we are going to name the file that the data will be written to 
   Returns: N/A
*/
const writeDataToFile = (jsonData, fileName) => {
  fs.writeFile(fileName, jsonData, function (error) {
    if (error) return console.log(`An error occured while writing data to ${fileName}...`, error);
  });
  console.log(`Data has been successfully written to ${fileName}`);
};

// Get the authentication cookie for all requests
const auth = await fetchAuthCookie();

// Get the series data for a specific year and season and store away in respective file
const specificSeasonSeriesData = await getCertainSeriesData("2022", "2");
writeDataToFile(JSON.stringify(specificSeasonSeriesData, null, 4), `../src/data/series-data-2022S2.json`);

// Get the current seasons series data (more generalized data such as series ID, name, licenses etc..)
const seriesDataForCurrentSeason = await getSeriesData();
writeDataToFile(JSON.stringify(seriesDataForCurrentSeason, null, 4), "../src/data/current-season-available-series.json");

// Get the detailed data for the season series
const seasonData = await getSeasonSeriesData();
writeDataToFile(JSON.stringify(seasonData, null, 4), "../src/data/current-season-schedules.json");

// Get the data for each vehicle
const carData = await getCarData();
writeDataToFile(JSON.stringify(carData, null, 4), "../src/data/car-data.json");

// Get all the tracks offered in the game
let trackData = await getTrackData();
writeDataToFile(JSON.stringify(trackData, null, 4), "../src/data/tracks.json");

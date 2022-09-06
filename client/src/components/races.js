import React, { useContext, useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { WeekContext } from "../contexts/WeekContext";
import { FilterContext } from "../contexts/FilterContext";
import { UserContext } from "../contexts/UserContext";
import { getUserOwnedCars, getUserOwnedTracks, getUserFavoritedSeries } from "../services/Services";
import RaceData from "../data/schedules.json";
import CarData from "../data/cars.json";

/* Column headers for the table */
const columns = [
  { field: "license", headerName: "License", width: 70, align: "center" },
  { field: "category", headerName: "Category", width: 80, align: "center" },
  {
    field: "seriesName",
    headerName: "Series",
    width: 250,
    editable: false,
    headerAlign: "center",
  },
  {
    field: "cars",
    headerName: "Cars",
    width: 250,
    editable: false,
    headerAlign: "center",
  },
  {
    field: "track",
    headerName: "Track",
    width: 275,
    editable: false,
    headerAlign: "center",
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 80,
    sortable: false,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "setup",
    headerName: "Fixed",
    width: 65,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "official",
    headerName: "Official",
    description: "This column has a value getter and is not sortable.",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "startDate",
    headerName: "Start",
    description: "This column has a value getter and is not sortable.",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "nextRace",
    headerName: "Next Race",
    description: "This column has a value getter and is not sortable.",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
];

// This will be used to convert a license number to the actual ingame license
const licenses = {
  1: "R",
  2: "D",
  3: "C",
  4: "B",
  5: "A",
};

// This will be used to the code for a category to the real category for display
const categories = {
  road: "Road",
  oval: "Oval",
  dirt_oval: "Dirt Oval",
  dirt_road: "RX",
};

// This will be used to convert a boolean value to a proper value to be displayed
const trueFalseConvert = {
  true: "Yes",
  false: "No",
};

/* Function that will take in the number of minutes and convert to hours and min
     Parameters: min - the number of min
     Returns: the time in hour and min format (ex. 90 min -> 1h 30min)
  */
const timeConvert = (mins) => {
  const minutes = mins % 60;
  const hours = Math.floor(mins / 60);
  return hours === 0 ? minutes + "m" : hours + "h " + minutes + "m";
};

export default function Data() {
  // CHANGE THIS AT THE BEGINNING OF A NEW SEASON
  const seasonStartDate = new Date("2022-6-14");

  // Global state for week number, filter bar, and user
  const { weekNum } = useContext(WeekContext);
  const { searchBarText, categoryFilter, licenseFilter, ownedContentFilter } = useContext(FilterContext);
  const { user } = useContext(UserContext);

  // User owned content
  const [ownedCars, setOwnedCars] = useState(new Map());
  const [ownedTracks, setOwnedTracks] = useState(new Map());
  const [favoriteSeries, setFavoriteSeries] = useState(new Map());

  useEffect(() => {
    fetchUserOwnedContent();
  }, []);

  /* Function that will gather all the user owned content from the DB
     Parameters: N/A
     Returns: N/A
  */
  const fetchUserOwnedContent = async () => {
    // Cars
    let cars = await getUserOwnedCars(user);
    setOwnedCars(new Map(cars));

    // Tracks
    let tracks = await getUserOwnedTracks(user);
    setOwnedTracks(new Map(tracks));

    // Series
    const series = await getUserFavoritedSeries(user);
    setFavoriteSeries(new Map(series));
  };

  /* Function that will gather all the data for the cars 
     Parameters: N/A
     Returns: an object of cars with their ids and the names 
  */
  const getCarData = () => {
    const carsIdsAndNames = [];

    // Get the data from the CarData json function
    Object.values(CarData).map((car) => {
      let carId = car.id;
      let carName = car.shortName;
      carsIdsAndNames.push({ carId, carName });
    });
    return carsIdsAndNames;
  };

  /*  Function that will map all the carIds with the car names
      Parameters: carIds - the id for each vehicle in a series
      Returns: a list of car names
  */
  const getCarsInSeries = (carIds) => {
    let cars = [];
    const carNames = getCarData();
    carIds.map((car) => {
      let names = carNames.find((vehicle) => vehicle.carId === car);
      cars.push(names.carName);
    });
    return cars;
  };

  /*  Function that will calculate when the next available race will be 
      Parameters: date - date obj of the date the race is occuring, interval - the interval in which the races will repeat
      Returns: the time of the next available race 
  */
  const nextRaceTime = (date, interval) => {
    // Get the new time the race will start
    let nextRaceTime = new Date(date.getTime() + interval * 60 * 1000);
    let currentTime = new Date().getTime();

    // Keep adding the interval to the newDate
    while (nextRaceTime < currentTime) {
      nextRaceTime = new Date(nextRaceTime.getTime() + interval * 60 * 1000);
    }
    return nextRaceTime;
  };

  /*  Function that will map the start date and times to a series that has more than 13 weeks
      Parameters: series - the series obj; seasonStartDate - the date that the current season starts at for comaparison
      Returns: start date and time
  */
  const extendedSeriesRace = (series, seasonStartDate) => {
    let startDate = "";
    let nextRace = "";
    let extendedSeries = 0;
    let repeatingSeries = series.schedule[0].session_start_data[0].repeating;

    // Check if the series is repeating or not, if it is not then check what the starting date is
    if (repeatingSeries === true) {
      // Find the week number that will represent the week that the extended series will continue on
      extendedSeries = Object.values(series.schedule).find((e) => {
        // Convert series start date to date object
        let seriesStartDate = new Date(e.session_start_data[0].start_date);

        // Check if the series start date is after the season start date and if it is return the week number
        if (seriesStartDate >= seasonStartDate) {
          return e;
        }
      });

      // Save the remaining schedule starting from the season start date
      let remainingRaceSchedule = series.schedule[extendedSeries.race_week_num + weekNum - 2];

      // Make a new date object and get the repeat interval
      let date = new Date(remainingRaceSchedule.session_start_data[0].start_date + "T" + remainingRaceSchedule.session_start_data[0].first_session_time);
      let interval = remainingRaceSchedule.session_start_data[0].repeat_minutes;

      // Get the values for the start date and next race
      startDate = date.toLocaleDateString();
      nextRace = nextRaceTime(date, interval).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
      return { weekToResumeFrom: extendedSeries.race_week_num + weekNum - 2, startDate: startDate, nextRace: nextRace };
    }

    // If we made it to this check, we know that the repeating var is false so go ahead and go through the session times array
    if (series.schedule[weekNum - 1].session_start_data[0].session_times.length > 1) {
      // Loop through the session times array and find the first session that is within this seasons start date
      extendedSeries = Object.values(series.schedule).find((e) => {
        // Get the first date the series starts on from the 0 index in the session times array
        let sessionStartDate = new Date(e.session_start_data[0].session_times[0]);

        // Check if the session start date is within the season start date
        if (sessionStartDate >= seasonStartDate) {
          return e;
        }
      });

      let remainingRaceSchedule = series.schedule[extendedSeries.race_week_num + weekNum - 2];
      let sessions = [...remainingRaceSchedule.session_start_data[0].session_times];
      // Loop through and find the next available race in the array
      for (let i = 0; i < sessions.length; i++) {
        let today = new Date();
        let sessionDate = new Date(sessions[i]);

        if (sessionDate <= today) {
          startDate = sessionDate.toLocaleDateString();
          nextRace = sessionDate.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
        }
      }
    }
    return { weekToResumeFrom: extendedSeries.race_week_num + weekNum - 2, startDate: startDate, nextRace: nextRace };
  };

  /*  Function that will take in the start time of a series and add the repeat min to it 
      Parameters: time - in hh:mm:ss format, repeat_min - the interval in which the races will repeat
      Returns: the time and date of the next race 
  */
  const normalSeriesRace = (series) => {
    let startDate = "";
    let nextRace = "";

    // Check if this is a non recurring series, if it is then get the date and time from the session_times arr
    if (series.schedule[weekNum - 1].session_start_data[0].repeating === false) {
      let today = new Date();
      let sessions = [...series.schedule[weekNum - 1].session_start_data[0].session_times];

      // Go through each session and return the next session that will occur
      for (let i = 0; i < sessions.length; i++) {
        let date = new Date(sessions[i]);
        if (date <= today) {
          startDate = date.toLocaleDateString();
          nextRace = date.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
          return { startDate: startDate, nextRace: nextRace };
        }
      }
    } else {
      // Format the date to make a new date object
      let date = new Date(series.schedule[weekNum - 1].session_start_data[0].start_date + "T" + series.schedule[weekNum - 1].session_start_data[0].first_session_time);

      // Get the refresh interval of each series
      let interval = series.schedule[weekNum - 1].session_start_data[0].repeat_minutes;

      // Get the time of the next race
      startDate = date.toLocaleDateString();
      nextRace = nextRaceTime(date, interval).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
    }
    return { startDate: startDate, nextRace: nextRace };
  };

  /*  Function that will handle filtering the data when filters are present
      Parameters: data - the original data before any filtering
      Returns: the filtered data based on search bar text, category/license/owned filters
  */
  const filterSearchQuery = (data) => {
    let convertedOwnedContentFilter = { Yes: true, No: false };

    // If the search bar is empty, do nothing and return original unfiltered data
    if (searchBarText === "" && categoryFilter === "All" && licenseFilter === "All" && ownedContentFilter === "All") return data;

    // Otherwise, return any entries matching the query in the search bar
    let filteredData = data.filter((race) => {
      // Match the search bar text
      let searchResult = race.seriesName.toLowerCase().includes(searchBarText);

      // If there are any matches for the category update the entry var
      if (searchResult === true && categoryFilter !== "All") searchResult = race.category.toLowerCase().includes(categoryFilter.toLowerCase());

      // If there are any matches for the license update the entry var
      if (searchResult === true && licenseFilter !== "All") searchResult = race.license.toLowerCase().includes(licenseFilter.toLowerCase());

      // If the user wants only owned/favorited content
      if (searchResult === true && ownedContentFilter !== "Both") {
        searchResult = race.contentOwned === convertedOwnedContentFilter[ownedContentFilter];
      }

      // Return the filtered data entry
      return searchResult;
    });
    console.log(filteredData);
    return filteredData;
  };

  /*  Function that will determine whether a user is eligible for a race or not based on their content
      Parameters: carIds - list of car ids required to be eligible; trackId - the id of the track; seriesId - the id of the series
      Returns: boolean representing whether the user is eligible or not
  */
  const userOwnsContent = (carIds, trackId) => {
    let carOwned = false;
    let trackOwned = false;

    // Check if the user owns any of the cars required to participate in series
    carIds.every((id) => {
      if (ownedCars.has(id) && ownedCars.get(id)) {
        // Since we only need to own one of the cars to participate in the series, set owned to true when we find one car that user owns
        carOwned = true;
        return false;
        // Break out of the loop
      } else {
        return true;
      }
    });

    // Check if the user owns the track
    if (ownedTracks.has(trackId) && ownedTracks.get(trackId)) {
      trackOwned = true;
    }
    return carOwned && trackOwned;
  };

  /*  Function that will gather all the data into an array of objects from the imported JSON file containing season data
      Parameters: weekNum - this will represent the week number import { getUserOwnedCars } from '../services/Services';
      Returns: an array containing data for all of the series taking place on the weekNum provided 
  */
  const getSeriesData = () => {
    const rows = [];

    // Get the data from the racedata json file
    Object.values(RaceData).map((series) => {
      let id = series.series_id;
      let license = licenses[series.license_group];
      let seriesName = series.series_name;
      let carIds = series.car_class_ids;
      let setup = trueFalseConvert[series.fixed_setup];
      let official = trueFalseConvert[series.official];
      let startDate = "";
      let nextRace = "";
      let category = "";
      let track = "";
      let trackId = "";
      let duration = "";
      let contentOwned = false;

      // Verify that the week number is within the schedule otherwise we get an undefined error (use for anything that will be utilizing the weekNum)
      if (weekNum <= series.schedule.length) {
        ({ startDate, nextRace } = normalSeriesRace(series));
        category = categories[series.schedule[weekNum - 1].track.category] !== null ? categories[series.schedule[weekNum - 1].track.category] : "";
        track = series.schedule[weekNum - 1].track.track_name !== null ? series.schedule[weekNum - 1].track.track_name : "";
        trackId = series.schedule[weekNum - 1].track.track_id !== null ? series.schedule[weekNum - 1].track.track_id : "";
        duration = series.schedule[weekNum - 1].race_time_limit !== null ? timeConvert(series.schedule[weekNum - 1].race_time_limit) : series.schedule[weekNum - 1].race_lap_limit + " L";
      }

      // This will be used to indicate a special series with more than 12 weeks
      if (series.schedule.length >= 13 && weekNum + 13 <= series.schedule.length) {
        // Retrieve the week we are going to resume from since these series types could have started prior to this season
        let weekToResumeFrom = 0;
        ({ weekToResumeFrom, startDate, nextRace } = extendedSeriesRace(series, seasonStartDate));

        // Get the remaining data
        category = categories[series.schedule[weekToResumeFrom].track.category] !== null ? categories[series.schedule[weekToResumeFrom].track.category] : "";
        track = series.schedule[weekToResumeFrom].track.track_name !== null ? series.schedule[weekToResumeFrom].track.track_name : "";
        trackId = series.schedule[weekToResumeFrom].track.track_id !== null ? series.schedule[weekToResumeFrom].track.track_id : "";
        duration = series.schedule[weekToResumeFrom].race_time_limit !== null ? timeConvert(series.schedule[weekToResumeFrom].race_time_limit) : series.schedule[weekToResumeFrom].race_lap_limit + " L";
      }

      contentOwned = userOwnsContent(carIds, trackId, seriesName);

      // Get each name for the cars by using the ID to find a match in the carNames object
      let cars = getCarsInSeries(carIds);

      // Add the data to the rows array ONLY IF there is a race that week (check if the track, is still set empty, if it is this indicates there is not a race that week)
      if (track !== "" && startDate !== "") rows.push({ id, license, seriesName, cars, setup, category, track, duration, official, startDate, nextRace, contentOwned });
    });

    // If there is a search query present in the search bar, filter the data before returning, if not just return all the data
    let filteredData = filterSearchQuery(rows);

    // Return the data
    return filteredData;
  };

  // Get the data from JSON file and save it to rows for the table
  const rows = getSeriesData();

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%" }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={15} rowsPerPageOptions={[10]} autoPageSize autoHeight disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} word />
      </Box>
    </Paper>
  );
}

import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { WeekContext } from "../contexts/WeekContext";
import RaceData from "./data/current-season-schedules.json";
import CarData from "./data/car-data.json";

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

/* Function that will take in the number of minutes and convert to hours and min
  Parameters: min - the number of min
  Returns: the time in hour and min format (ex. 90 min -> 1h 30min)
*/
const timeConvert = (mins) => {
  var num = mins;
  var hours = num / 60;
  var hoursRounded = Math.floor(hours);
  var min = Math.round(hours - hoursRounded) * 60;
  var minRounded = Math.floor(min);
  return hoursRounded === 0 ? minRounded + "m" : hoursRounded + "h " + minRounded + "m";
};

/* Function that will take in the time in hh:mm:ss format and return in local hh:mm format
  Parameters: date - the date in YYYY-MM-DD format; time - in hh:mm:ss format
  Returns: the time in local format without seconds
*/
const timeToLocal = (date, time) => {
  const formattedDate = new Date(date + "T" + time);
  let newTime = formattedDate.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
  return newTime;
};

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

export default function Data() {
  // Global state for week number
  const { weekNum } = useContext(WeekContext);

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

  /* Function that will take in the start time of a series and add the repeat min to it 
  Parameters: time - in hh:mm:ss format, repeat_min - the interval in which the races will repeat
  Returns: the time of the next race 
  */
  const nextRaceTime = (series) => {
    let startDate = "";
    let nextRace = "";

    // If there are mutiple session times, check which session time is up next and return it
    if (series.schedule[weekNum - 1].session_start_data[0].repeating === false && series.schedule[weekNum - 1].session_start_data[0].session_times.length > 1) {
      // Set todays date
      const today = new Date().toISOString();

      // If there are multiple session times for a series, go through each one until we find the next available session
      series.schedule[weekNum - 1].session_start_data[0].session_times.every((session) => {
        // If the session has still not occured, set it as the raceWeekend
        let raceWeekend = session > today ? session : "passed";

        // If the session has not yet 'passed', return it and break out of the loop
        if (raceWeekend !== "passed") {
          let nextRaceDateAndTime = new Date(raceWeekend);
          startDate = nextRaceDateAndTime.toLocaleDateString();
          nextRace = nextRaceDateAndTime.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
          return false;
        }
        return { startDate: startDate, nextRace: nextRace };
      });
    }

    // Check if this is a non recurring series, if it is then get the date and time from the session_times arr
    if (series.schedule[weekNum - 1].session_start_data[0].repeating === false) {
      // Get the data from the series
      let date = new Date(series.schedule[weekNum - 1].session_start_data[0].session_times);
      startDate = date.toLocaleDateString();
      nextRace = date.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
    } else {
      // Format the date to make a new date object
      let date = new Date(series.schedule[weekNum - 1].session_start_data[0].start_date + "T" + series.schedule[weekNum - 1].session_start_data[0].first_session_time);

      // Get the refresh interval of each series
      let interval = series.schedule[weekNum - 1].session_start_data[0].repeat_minutes;

      // Get the new time the race will start
      let nextRaceTime = new Date(date.getTime() + interval * 60 * 1000);
      let currentTime = new Date().getTime();

      // Keep adding the interval to the newDate
      while (nextRaceTime < currentTime) {
        nextRaceTime = new Date(nextRaceTime.getTime() + interval * 60 * 1000);
      }

      startDate = date.toLocaleDateString();
      nextRace = nextRaceTime.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
    }
    return { startDate: startDate, nextRace: nextRace };
  };

  /* Function that will gather all the data into an array of objects from the imported JSON file containing season data
  Parameters: weekNum - this will represent the week number 
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
      let duration = "";

      // Verify that the week number is within the schedule otherwise we get an undefined error (use for anything that will be utilizing the weekNum)
      if (weekNum <= series.schedule.length) {
        ({ startDate, nextRace } = nextRaceTime(series));
        category = categories[series.schedule[weekNum - 1].track.category] !== null ? categories[series.schedule[weekNum - 1].track.category] : "";
        track = series.schedule[weekNum - 1].track.track_name !== null ? series.schedule[weekNum - 1].track.track_name : "";
        duration = series.schedule[weekNum - 1].race_time_limit !== null ? timeConvert(series.schedule[weekNum - 1].race_time_limit) : series.schedule[weekNum - 1].race_lap_limit + " L";
      }

      // Get each name for the cars by using the ID to find a match in the carNames object
      let cars = [];
      const carNames = getCarData();
      carIds.map((car) => {
        let names = carNames.find((vehicle) => vehicle.carId === car);
        cars.push(names.carName);
      });

      // Add the data to the rows array ONLY IF there is a race that week (check if the track, is still set empty, if it is this indicates there was not a race that week)
      if (track !== "") rows.push({ id, license, seriesName, cars, setup, category, track, duration, official, startDate, nextRace });
    });
    return rows;
  };

  // Get the data from JSON file and save it to rows for the table
  const rows = getSeriesData(0);

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%" }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={15} rowsPerPageOptions={[10]} autoPageSize autoHeight disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} word />
      </Box>
    </Paper>
  );
}

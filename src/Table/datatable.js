import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RaceData from "./data/current-season-schedules.json";
import CarData from "./data/car-data.json";

/* Column headers for the table */
const columns = [
  { field: "license", headerName: "License", width: 70 },
  { field: "category", headerName: "Category", width: 80 },
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
    headerAlign: "center",
  },
  {
    field: "setup",
    headerName: "Fixed",
    description: "This column has a value getter and is not sortable.",
    width: 55,
    headerAlign: "center",
  },
];

/* Function that will take in the number of minutes and convert to hours and min
  Parameters: min - the number of min
  Returns: the time in hour and min format (ex. 90 min -> 1h 30min)
*/
const timeConvert = (min) => {
  var num = min;
  var hours = num / 60;
  var hoursRounded = Math.floor(hours);
  var min = Math.round(hours - hoursRounded) * 60;
  var minRounded = Math.floor(min);
  return hoursRounded === 0 ? minRounded + " m" : hoursRounded + "h " + minRounded + "m";
};

export default function Data({ week }) {
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
  const fixedSetup = {
    true: "Yes",
    false: "No",
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

  // Get the car ids and names
  const carNames = getCarData();

  /* Function that will gather all the data into an array of objects from the imported JSON file containing season data
  Parameters: weekNum - this will represent the week number 
  Returns: an array containing data for all of the series taking place on the weekNum provided 
*/
  const getSeriesData = (week) => {
    const rows = [];

    // Get the data from the racedata json file
    Object.values(RaceData).map((series) => {
      let id = series.series_id;
      let license = licenses[series.license_group];
      let category = categories[series.schedule[week].track.category];
      let seriesName = series.series_name;
      let carIds = series.car_class_ids;
      let track = series.schedule[week].track.track_name;
      let duration = series.schedule[week].race_time_limit !== null ? timeConvert(series.schedule[week].race_time_limit) : series.schedule[week].race_lap_limit + " L";
      let setup = fixedSetup[series.fixed_setup];

      // Get each name for the cars by using the ID to find a match in the carNames object
      let cars = [];
      carIds.forEach((car) => {
        let names = carNames.find((vehicle) => vehicle.carId === car);
        cars.push(names.carName);
      });

      // Add the data to the rows array
      rows.push({ id, license, category, seriesName, cars, track, duration, setup });
    });
    return rows;
  };

  // Get the data from JSON file and save it to rows for the table
  const rows = getSeriesData(0);
  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%" }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={15} rowsPerPageOptions={[10]} autoPageSize='true' autoHeight='true' disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} word />
      </Box>
    </Paper>
  );
}

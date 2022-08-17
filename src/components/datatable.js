import React from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RaceData from "../data/current-season-schedules.json";

/* Column headers for the table */
const columns = [
  { field: "license", headerName: "License", width: 70 },
  { field: "category", headerName: "Category", width: 80 },
  {
    field: "seriesName",
    headerName: "Series",
    width: 250,
    editable: true,
  },
  {
    field: "cars",
    headerName: "Cars",
    width: 100,
    editable: true,
  },
  {
    field: "track",
    headerName: "Track",
    width: 250,
    editable: true,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 80,
    sortable: false,
    editable: true,
  },
  {
    field: "setup",
    headerName: "Fixed",
    description: "This column has a value getter and is not sortable.",
    width: 80,
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

/* Function that will gather all the data into an array of objects from the imported JSON file containing season data
  Parameters: weekNum - this will represent the week number 
  Returns: an array containing data for all of the series taking place on the weekNum provided 
*/
const getSeriesData = (weekNum) => {
  const rows = [];
  Object.values(RaceData).map((series) => {
    let id = series.series_id;
    let license = licenses[series.license_group];
    let category = series.schedule[weekNum].track.category;
    let seriesName = series.series_name;
    let cars = series.car_class_ids;
    let track = series.schedule[weekNum].track.track_name;
    let duration = series.schedule[weekNum].race_time_limit !== null ? timeConvert(series.schedule[weekNum].race_time_limit) : series.schedule[weekNum].race_lap_limit + " L";
    let setup = series.fixed_setup;

    rows.push({ id, license, category, seriesName, cars, track, duration, setup });
  });
  return rows;
};

// Get the data from JSON file and save it to rows for the table
const rows = getSeriesData(0);

export default function Data() {
  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%" }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} autoPageSize='true' autoHeight='true' disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} />
      </Box>
    </Paper>
  );
}

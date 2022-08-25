import React from "react";
import { Box, Checkbox, Paper, Typography, FormGroup, FormControlLabel } from "@mui/material";
import CarData from "../data/car-data.json";
import SeasonData from "../data/current-season-schedules.json";

export default function OwnedCars() {
  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  /* Function that will handle when a user selects a checkbox for a car they own
      Parameters: carSelected - the id of the vehicle the user owns
      Returns: N/A
    */
  const handleCarSelected = (carSelected, selected) => {
    console.log(carSelected, selected);
  };

  /* Function that will find the car name with the car id
      Parameters: ids - list of car ids, type - the race type the car participates in 
      Returns: car object containing the car anem and track type 
    */
  const getCarNamesFromId = (id, type) => {
    // Find car id and get the cars name
    let carInfo = Object.values(CarData).find((car) => car.id === id);

    // Return the car name, id, and track category it belongs to
    return { id: carInfo.id, name: carInfo.shortName, category: type };
  };

  /* Function that will gather all the car ids for each series and the type of races they participate in 
      Parameters: N/A
      Returns: list of car names and their type
    */
  const getCarsFromFile = () => {
    let cars = [];
    let seen = [];

    // Go Through each series adn get the car ids and track type that the car is used for
    Object.values(SeasonData).map((series) => {
      // Since some series have multiple car ids, go through each one and find the name of the car
      series.car_class_ids.forEach((id) => {
        // If the car id has not been seen already, add it to the cars list and the seen list
        if (!seen.includes(id)) {
          seen.push(id);
          cars.push(getCarNamesFromId(id, series.track_type));
        }
      });
    });

    // Return the list of cars names and the track type they belong to
    return cars;
  };

  /* Function that will organize each car with the respective category
      Parameters: category - the category of car
      Returns: list of divs with each cars name
    */
  const carsUnderCategories = (category) => {
    // Get the list of all cars and the types of races they participate in
    let listOfAvailableCars = getCarsFromFile();

    // Map Each car to a div
    let categorizedCarList = listOfAvailableCars.map((car) => {
      if (car.category === category) return <FormControlLabel key={car.id} value={car.id} control={<Checkbox />} label={car.name} onChange={(e) => handleCarSelected(e.target.value, e.target.checked)} />;
    });

    // Return the list of divs with the car names
    return categorizedCarList;
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "75%", display: "flex", direction: "column" }}>
      <Box className='cars-owned-container' sx={{ display: "flex", alignContent: "center", width: "100%", justifyContent: "space-evenly", margin: "20px 15px" }}>
        {types.map((category) => {
          return (
            <Box sx={{ fontWeight: "bold", fontSize: "23px" }}>
              {typesFormatted[category]}
              <FormGroup sx={{ fontWeight: "normal", fontSize: "18px" }}>{carsUnderCategories(category)}</FormGroup>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import CarData from "../data/car-data.json";
import SeasonData from "../data/current-season-schedules.json";

export default function OwnedCars() {
  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];
  const typesFormatted = { road: "Road", oval: "Oval", dirt_oval: "Dirt Oval", dirt_road: "Dirt Road" };

  /* Function that will find the car name with the car id
      Parameters: ids - list of car ids, type - the race type the car participates in 
      Returns: car object containing the car anem and track type 
    */
  const getCarNamesFromId = (id, type) => {
    // Find car id and get the cars name
    let carInfo = Object.values(CarData).find((car) => car.id === id);

    // Save the car name and type to the car obj to return
    let car = new Object();
    car.name = carInfo.shortName;
    car.type = type;

    // Return the car name and track type it belongs to
    return car;
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
      let id = series.car_class_ids;
      let type = series.track_type;

      // Since some series have multiple car ids, go through each one and find the name of the car
      id.forEach((carId) => {
        // If the car id has not been seen already, add it to the cars list and the seen list
        if (!seen.includes(carId)) {
          seen.push(carId);
          cars.push(getCarNamesFromId(carId, type));
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
      if (car.type === category) return <div>{car.name}</div>;
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
              <Box sx={{ fontWeight: "normal", fontSize: "18px" }}>{carsUnderCategories(category)}</Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

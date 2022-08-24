import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import CarData from "../data/car-data.json";
import SeasonData from "../data/current-season-schedules.json";

export default function OwnedCars() {
  // The different types of races cars will be a part of
  const types = ["road", "oval", "dirt_oval", "dirt_road"];

  /* Function that will find the car name with the car id
      Parameters: ids - list of car ids, type - the race type the car participates in 
      Returns: list of car names and the type of race it participates in 
    */
  const getCarNamesFromId = (id, type) => {
    let car = new Object();
    let carInfo = Object.values(CarData).find((car) => car.id === id);
    car.name = carInfo.shortName;
    car.type = type;
    return car;
  };

  /* Function that will gather all the car ids for each series and the type of races they participate in 
      Parameters: N/A
      Returns: list of car names and their type
    */
  const getCarsFromFile = () => {
    let cars = [];
    let seen = [];
    Object.values(SeasonData).map((series) => {
      let id = series.car_class_ids;
      let type = series.track_type;
      id.forEach((carId) => {
        if (!seen.includes(carId)) {
          seen.push(carId);
          cars.push(getCarNamesFromId(carId, type));
        }
      });
    });
    return cars;
  };

  const carsUnderCategories = (category) => {
    // Get the list of all cars and the types of races they participate in
    let listOfAvailableCars = getCarsFromFile();
    let categorizedCarList = listOfAvailableCars.map((car) => {
      if (car.type === category) return <div>{car.name}</div>;
    });
    return categorizedCarList;
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: "15px", width: "95%", display: "flex", direction: "column" }}>
      <Box className='cars-owned-container'>
        {types.map((category) => {
          return (
            <Box sx={{ fontWeight: "bold" }}>
              {category}
              <Box sx={{ fontWeight: "normal" }}>{carsUnderCategories(category)}</Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

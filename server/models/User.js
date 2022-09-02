const mongoose = require("mongoose");
const { uuidv4 } = require("uuid");
const ObjectId = require("mongodb").ObjectId;

// Table schema for a user
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
    series: Array,
    cars: Array,
    tracks: Array,
  },
  { collection: "users" }
);

const db = mongoose.connection.useDb("iRacingWeeklyDB");

// Function to get the provided users owned cars
userSchema.statics.getOwnedCars = async function (userObj) {
  try {
    const cars = await this.findOne({ "username.user.id": userObj.id }).then((response) => response.cars[0]);
    return cars;
  } catch (error) {
    throw error;
  }
};

// Function to update the users owned cars
userSchema.statics.updateOwnedCars = async function (userObj, cars) {
  try {
    const user = this.findOne({ "username.user.id": userObj.id });
    const updated = await this.updateOne(user, { $set: { cars: cars } });
    return updated;
  } catch (error) {
    throw error;
  }
};

// Function to get the users owned tracks
userSchema.statics.getOwnedTracks = async function (userObj) {
  try {
    const tracks = await this.findOne({ "username.user.id": userObj.id }).then((response) => response.tracks[0]);
    return tracks;
  } catch (error) {
    throw error;
  }
};

// Function to update the users owned tracks
userSchema.statics.updateOwnedTracks = async function (userObj, updatedTrackList) {
  try {
    const user = this.findOne({ "username.user.id": userObj.id });
    const updatedTracks = await this.updateOne(user, { $set: { tracks: updatedTrackList } });
    console.log(updatedTrackList, user.toString());
    return updatedTracks;
  } catch (error) {
    throw error;
  }
};

// Function to get the users favorited tracks
userSchema.statics.getFavoriteSeries = async function (userObj) {
  try {
    const series = await this.findOne({ "username.user.id": userObj.id }).then((response) => response.series[0]);
    return series;
  } catch (error) {
    throw error;
  }
};

// Function to update the users favorite series
userSchema.statics.updateFavoriteSeries = async function (userObj, updatedSeriesList) {
  try {
    const user = this.findOne({ "username.user.id": userObj.id });
    const updatedSeries = await this.updateOne(user, { $set: { series: updatedSeriesList } });
    return updatedSeries;
  } catch (error) {
    throw error;
  }
};

module.exports = db.model("users", userSchema);

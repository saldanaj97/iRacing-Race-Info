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

module.exports = db.model("users", userSchema);

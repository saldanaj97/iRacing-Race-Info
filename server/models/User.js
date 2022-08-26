const mongoose = require("mongoose");
const { uuidv4 } = require("uuid");

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

// Function to create a user in the users collection
userSchema.statics.createUser = async function (username, password) {
  try {
    const user = await this.create({
      username,
      password,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to get all users in the collection
userSchema.statics.getAllUsers = async function () {
  try {
    const allUsers = await this.find();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

// Function to get a user by username
userSchema.statics.getUserByUsername = async function (username) {
  try {
    const user = await this.findOne({ username: username });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);

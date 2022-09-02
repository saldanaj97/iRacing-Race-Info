const UserModel = require("../models/User");

// Function to retrieve the users owned cars
const getUsersOwnedCars = async (req, res) => {
  try {
    const { user } = req.body;
    const ownedCars = await UserModel.getOwnedCars(user);
    return res.status(200).json({ success: true, ownedCars });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

// Function to update the users owned cars
const updateOwnedCars = async (req, res) => {
  try {
    const { user, cars } = req.body;
    const ownedCars = UserModel.updateOwnedCars(user, cars);
    return res.status(200).json({ success: true, message: "Owned cars updated. ", ownedCars });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

// Function that will gather the users owned tracks
const getOwnedTracks = async (req, res) => {
  try {
    const { user } = req.body;
    const ownedTracks = await UserModel.getOwnedTracks(user);
    return res.status(200).json({ success: true, ownedTracks });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
// Function to update the users owned tracks
const updateOwnedTracks = async (req, res) => {
  try {
    const { user, tracks } = req.body;
    const ownedTracks = UserModel.updateOwnedTracks(user, tracks);
    return res.status(200).json({ success: true, message: "Owned tracks updated. ", ownedTracks });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { getUsersOwnedCars, updateOwnedCars };

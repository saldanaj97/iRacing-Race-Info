const UserModel = require("../models/User");

// Function to retrieve the users owned cars
const getUsersOwnedCars = async (req, res) => {
  try {
    const { user } = req.body;
    const ownedCars = UserModel.getOwnedCars(user);
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
    return res.status(200).json({ success: true, message: "Users owned cars updated. ", ownedCars });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { getUsersOwnedCars, updateOwnedCars };

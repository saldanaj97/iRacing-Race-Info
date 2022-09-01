const UserModel = require("../models/User");

const getOwnedCars = async (req, res) => {
  try {
    const { user, cars } = req.body;
    const updatedOwnedCars = UserModel.updateOwnedCars(user, cars);
    return res.status(200).json({ success: true, message: "Users owned cars updated. ", updatedOwnedCars });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { getOwnedCars };

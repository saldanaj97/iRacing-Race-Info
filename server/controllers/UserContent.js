const UserModel = require("../models/User");

const getOwnedCars = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { getOwnedCars };

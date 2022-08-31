const UserModel = require("../models/User");

const getOwnedCars = async (req, res) => {
  try {
    const { user, cars } = req.body;
    console.log(cars);
    const { email } = user.profile.data;
    //const updatedOwnedCars = UserModel.updateOwnedCars(email, cars);
    return res.status(200).json({ success: true, message: "Users owned cars updated. " });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { getOwnedCars };

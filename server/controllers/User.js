const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

// Function to create a new user
const createNewUser = async (req, res) => {
  try {
    // Get the username and password from the body
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Send the new user data to the users collection
    const user = await UserModel.createUser(username, hashedPassword);

    // Return a sucess status code
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { createNewUser, getAllUsers };

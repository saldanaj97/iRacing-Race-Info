const express = require("express");
const User = require("../controllers/User");

const router = express.Router();

//prettier-ignore
router
.post('/owned-cars', User.getUsersOwnedCars)
.post('/update-owned-cars', User.updateOwnedCars)

module.exports = router;

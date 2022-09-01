const express = require("express");
const UserContent = require("../controllers/UserContent");

const router = express.Router();

//prettier-ignore
router
.post('/owned-cars', UserContent.getUsersOwnedCars)
.post('/update-owned-cars', UserContent.updateOwnedCars)

module.exports = router;

const express = require("express");
const UserContent = require("../controllers/UserContent");

const router = express.Router();

//prettier-ignore
router
.post('/owned-cars', UserContent.getOwnedCars)

module.exports = router;

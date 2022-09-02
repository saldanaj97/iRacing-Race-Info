const express = require("express");
const User = require("../controllers/User");

const router = express.Router();

//prettier-ignore
router
.post('/owned-cars', User.getUsersOwnedCars)
.post('/update-owned-cars', User.updateOwnedCars)
.post('/owned-tracks', User.getOwnedTracks)
.post('/update-owned-tracks', User.updateOwnedTracks)
.post('/favorite-series', User.getFavoriteSeries)
.post('/update-favorite-series', User.updateFavoriteSeries)

module.exports = router;

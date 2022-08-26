const express = require("express");
const user = require("../controllers/User");

const router = express.Router();

//prettier-ignore
router
.get('/', user.getAllUsers)
.post('/', user.createNewUser)

module.exports = router;

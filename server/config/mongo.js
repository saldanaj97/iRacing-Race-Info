const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });

// Mongo URI
const url = process.env.MONGODB_URI;
console.log(url);

mongoose.connect(url, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongo has connected successfully");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});

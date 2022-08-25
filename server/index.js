const express = require("express");
const PORT = process.env.PORT || 3001;
const db = require("./config/mongo");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

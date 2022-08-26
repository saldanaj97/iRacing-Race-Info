const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const db = require("./config/mongo");

const app = express();

const usersRoutes = require("./routes/Users");

// Cors
const corsOptions = {
  origin: ["https://localhost:3001/"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

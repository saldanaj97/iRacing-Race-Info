const express = require("express");
const cors = require("cors");
const db = require("./config/mongo");

const PORT = process.env.PORT || 3001;

const app = express();

const usersRoutes = require("./routes/Users");
const usersContent = require("./routes/UserContent");

// Cors
const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", usersRoutes);
app.use("/users-content", usersContent);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

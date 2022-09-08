const express = require("express");
const cors = require("cors");
const db = require("./config/mongo");

const PORT = process.env.PORT || 3001;

const app = express();

const usersRoutes = require("./routes/Users");

// Cors
const corsOptions = {
  origin: ["*"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};
//app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users-content", usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const dogsRoutes = require("./routes/dogs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("안녕하세요 ??? 서버 입니다.");
});
app.use("/dogs", dogsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;

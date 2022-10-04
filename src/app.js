require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const error = require("./middleware/error");
const AuthRoute = require("./routes/AuthRoute");
const { runSocketIO } = require("./helper/socketIO");

const app = express();
const httpServer = createServer(app);

runSocketIO(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res, next) => {
  res.json({
    msg: "This is user and location service (2)",
  });
});
app.use("/auth", AuthRoute);
app.use(error);

module.exports = httpServer;

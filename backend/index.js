const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const databaseConnection = require("./connection/connect");
const mainRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// main middleware
// where we are specifying that all the orutes will have /api/v1 route
app.use("/api/v1", mainRouter);

// database connection and port start
databaseConnection();
app.listen(3000, () => {
  console.log("backend started at port 3000.");
});

const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://admin:nDJeIzBY1xIZTGXq@cluster0.wt6tbkr.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log("error while connection", err);
    });
};

module.exports = databaseConnection;

import mongoose from "mongoose";

const DB = "<DATABASE CONNECTION URL>";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfully established with database.");
  })
  .catch((error) => {
    console.log("No connection with databse. " + error);
  });

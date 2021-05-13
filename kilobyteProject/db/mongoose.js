const mongoose = require("mongoose");

const connectUrl = "mongodb://127.0.0.1:27017/";
const databaseName = "kilo-byte-db";

mongoose
  .connect(connectUrl + databaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(
      "connected to the database with database: " +
        databaseName +
        " at " +
        connectUrl
    );
  })
  .catch((e) => {
    console.log("Oops Something went wrong in connection with database");
  });

const express = require("express");
const connectToDB = require("./config/db");
require("dotenv").config();

// connection to Database
connectToDB();

// init app
const app = express();

// Routers
app.use("/api/v1/books", require("./routes/book"));

const portNumber = process.env.PORT || 5000;
app.listen(portNumber, () => {
  console.log(`Hello, Server is running on port ${PORT}`);
});

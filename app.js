const express = require("express");

require("dotenv").config();

// init app
const app = express();

// Routers
app.use("/api/v1/book", require("./routes/book"));

const portNumber = process.env.PORT || 5000;
app.listen(portNumber, () => {
  console.log(`Hello, Server is running on port ${PORT}`);
});

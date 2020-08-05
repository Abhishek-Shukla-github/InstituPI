let express = require("express");
let dotenv = require("dotenv");

//Routes File
let bootcamps = require("./routes/bootcamps");

//Load the env vars
dotenv.config({ path: "./config/config.env" });
const app = express();

const PORT = process.env.PORT || 5000;

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

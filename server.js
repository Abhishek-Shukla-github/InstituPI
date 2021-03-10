const path = require('path');
let express = require("express");
let dotenv = require("dotenv");
let colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const courses = require('./routes/courses');
const fileupload = require('express-fileupload');

//Routes File
let bootcamps = require("./routes/bootcamps");

//Load the env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// File uploading
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use('/api/v1/courses', courses);

//Middleware is always placed after mounting the routes
app.use(errorHandler); //Using errorHandler here makes it available globally for all routes

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} with secret ${process.env.SECRET}`
      .yellow.bold
  )
);

//Handle unhandles promise Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:- ${err.message}`.red);
  //CLose the server $ exit the process
  server.close(() => process.exit(1));
});

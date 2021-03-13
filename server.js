const path = require('path');
let express = require("express");
let dotenv = require("dotenv");
let colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const courses = require('./routes/courses');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const reviews = require('./routes/reviews');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

//Routes File
let bootcamps = require("./routes/bootcamps");
const auth = require('./routes/auth');
//Load the env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount Routers
app.use("/api/v1/institutions", bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews', reviews);

//Middleware is always placed after mounting the routes
app.use(errorHandler); //Using errorHandler here makes it available globally for all routes
//Cookie Parser
app.use(cookieParser());

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

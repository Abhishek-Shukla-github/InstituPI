const errorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  //We make a copy of err in variable error by object destructuring to save the copy of original err
  let error = { ...err };
  error.message = err.message;
  //Log to console for dev
  console.log(err.stack.red);
  //err.stack specifies where the error has occured in the program

  //Mongoose Bad ObjectID
  if (err.name === "CastError") {
    const message = `Resource not found with an ID of ${err.value}`;
    error = new errorResponse(message, 404);
  }

  //Duplicate data entry
  //We check via err.code because all MongoError have code 11000 in error object
  if (err.code === 11000) {
    const message = "Duplicate field entry";
    error = new errorResponse(message, 400);
  }

  //Mongoose Validator
  if (err.name === "ValidationError") {
    //This error contains lots of error and therefor we extract messages of all the errors like validate name,job,etc and save it in message array
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
  }

  //Since we use error as copy of err we use it error.statusCode in res.status to check the error's statusCode and send reply accordingly
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;

const errorResponse=require("../utils/errorResponse")
const errorHandler = (err, req, res, next) => {
  //We make a copy of err in variable error by object destructuring to save the copy of original err
  let error={...err};
  error.message=err.message;
  //Log to console for dev
  console.log(err.stack.red);
  //err.stack specifies where the error has occured in the program

  //Mongoose Bad ObjectID
  if(err.name==="CastError"){
    const message=`Resource not found with an ID of ${err.value}`;
    error=new errorResponse(message,404);
  }

//Since we use error as copy of err we use it error.statusCode in res.status to check the error's statusCode and send reply accordingly
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;

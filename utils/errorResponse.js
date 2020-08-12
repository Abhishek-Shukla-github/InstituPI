class ErrorResponse extends Error {
  //Error is a built in Express class
  constructor(message, statusCode) {
    //Error class which is parent class has attribute message but here we are passing our message using super keyword toi the  main Error class from ErrorResponse subclass
    super(message);
    this.statusCode = statusCode;
  }
}
module.exports = ErrorResponse;

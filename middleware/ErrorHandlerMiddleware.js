const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");
const ErrorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    //setting defaults 
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || " Something went wrong, please try again later."
  }
  // if (err instanceof CustomError) {
  //   return res.status(customError.statusCode).json({ message: customError.message });
  // } This is no more needed after modification

  if(err.code && err.code===11000){
    customError.message= `${err.keyValue.email} is already in use, please try registering with a new email.`
    customError.statusCode=400; //Cuz it is a bad request 
  }
  return res
    .status(customError.statusCode)
    .json({ message: customError.message});
};

module.exports = ErrorHandlerMiddleware;
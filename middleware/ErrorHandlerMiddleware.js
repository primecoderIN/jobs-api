const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");
const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong, please try again later." });
};

module.exports = ErrorHandlerMiddleware;
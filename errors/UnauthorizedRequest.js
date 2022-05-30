const CustomError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class UnauthorzedRequest extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorzedRequest;

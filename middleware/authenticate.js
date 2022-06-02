const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { UnauthorzedRequest } = require("../errors");

const Authorize = (req, res) => {
  //Check for header
  const authHeader = req.body.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw UnauthorzedRequest("Unauthorized request.");
  }
  const token = authHeader.split(" ")[1]; //if header is present then get the token to verify it
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //Attach the user to the job route
    req.user = { UserID: payload.UserID, name: payload.name };
    next();
  } catch (error) {
    throw UnauthorzedRequest("Unauthorized request.");
  }
};

module.exports = Authorize;

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { UnauthorzedRequest } = require("../errors");

const AuthorizeUser = (req, res,next) => {
  //Check for header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorzedRequest("Unauthorized request.");
  }
  const token = authHeader.split(" ")[1]; //if header is present then get the token to verify it
  try {
    const {UserID,name} = jwt.verify(token,process.env.JWT_SECRET);
    //Attach the user to the job route
    req.user = { UserID ,name};
    next();
  } catch (error) {
    throw new UnauthorzedRequest("Unauthorized request.");
  }
};

module.exports = AuthorizeUser;

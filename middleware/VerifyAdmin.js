const jwt = require("jsonwebtoken");
const { UnauthorzedRequest } = require("../errors");

const VerifyUser = (req, res, next) => {
  //Check for header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorzedRequest("Unauthorized request.");
  }
  const token = authHeader.split(" ")[1]; //if header is present then get the token to verify it
  try {
    const { UserID, name, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);
    //Attach the user to the job route
    if (isAdmin) {
      req.user = { UserID, name };
      next();
    } else {
      throw new UnauthorzedRequest("Unauthorized request.");
    }
  } catch (error) {
    throw new UnauthorzedRequest("Unauthorized request.");
  }
};

module.exports = VerifyUser;

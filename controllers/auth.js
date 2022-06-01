const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
// const bcrypt = require("bcryptjs");
const { BadRequest } = require("../errors");
// const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  // Basic custom validation, we can valdiate this way as well
  //   const { name, email, password } = req.body;
  //   if (!name || !email || !password) {
  //     throw new BadRequest("Please provide valid name, email and password");
  //   }

  //Example of salting password in controller, we can also has password here
  //   const { name, email, password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const tempUser = { name, email, password: hashedPassword };
  //   const user = await User.create({ ...tempUser });

  //Generating token
  const user = await User.create({ ...req.body });
  //const token = jwt.sign({UserID: user._id, user: user.name},"jwtsecret", {expiresIn:"10d"}) General way
  res
    .status(StatusCodes.CREATED)
    .json({ User: user.name, Token: User.createJWT() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide username and password.");
  }
  const user = await User.find({ email });
  if (user.length === 0) {
    throw new BadRequest("Please provide valid email.");
  }

  const isPasswordMatched = await User.comparePassword(
    password,
    user[0].password
  );
  if (!isPasswordMatched) {
    throw new BadRequest("Please provide valid password.");
  }
  res
    .status(StatusCodes.OK)
    .json({ name: user[0].name, Token: User.createJWT() });
};

module.exports = {
  register,
  login,
};

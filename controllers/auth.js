const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");

const register = async (req, res) => {
  //Generating token
  const { name, email } = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ User: name, Token: User.createJWT(email, name) });
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

  res.status(StatusCodes.OK).json({
    name: user[0].name,
    Token: User.createJWT(user[0].email, user[0].name),
  });
};

module.exports = {
  register,
  login,
};

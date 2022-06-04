const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { BadRequest } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });
  const token = jwt.sign(
    { UserID: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );
  res.status(StatusCodes.CREATED).json({ User: name, Token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("First");
    throw new BadRequest("Please provide username and password.");
  }
  const user = await User.find({ email });

  if (user.length === 0) {
    throw new BadRequest("Please provide valid email.");
  }

  const isPasswordMatched = await bcrypt.compare(password, user[0].password);
  console.log("Matched", isPasswordMatched);
  if (!isPasswordMatched) {
    throw new BadRequest("Please provide valid password.");
  }
  const token = jwt.sign(
    { UserID: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.status(StatusCodes.OK).json({
    name: user[0].name,
    Token: token,
  });
};

module.exports = {
  register,
  login,
};

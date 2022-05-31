const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: 6,
    // maxlength: 12, Removed because hashed passwords does have longer characters
  },
});

//More clean approach to hash the password before saving it in database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); //Even if we do not call next it will work
});

UserSchema.methods.createToken = function () {
  return jwt.sign({ UserID: this._id, name: this.name }, "JwtSecret", {
    expiresIn: "10d",
  });
};

module.exports = mongoose.model("User", UserSchema);

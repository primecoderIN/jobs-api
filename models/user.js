const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address.",
    ],
    unique: true,
    trim: true,
  },
  password: {
    trim: true,
    type: String,
    required: [true, "Please provide a password."],
    minlength: 6,
    // maxlength: 12, Removed because hashed passwords does have longer characters
  },
  Role : {
    type: String,
    enum: ["Admin","User"],
    default: "User"
  }
});

module.exports = mongoose.model("User", UserSchema);

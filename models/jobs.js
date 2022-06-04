const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name."],
      maxlength: 100,
    },
    title: {
      type: String,
      required: [true, "Please provide job title."],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "shortlisted"],
      default: "pending",
    },
    skills: [
      {
        type: String,
        required: [true, "Please provide required skills."],
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

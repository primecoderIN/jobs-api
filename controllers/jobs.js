const Job = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.UserID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, TotalRecords: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { UserID },
    params: { id: JobID },
  } = req;

  const job = await Job.findOne({ _id: JobID, createdBy: UserID });
  if (!job) {
    throw new NotFound(`No job found with id ${JobID}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.UserID;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  const {
    body,
    user: { UserID },
    params: { id: JobID },
  } = req;
  if (!body) {
    throw new BadRequest("Status can not be empty.");
  }
  const job = await Job.findOneAndUpdate(
    { _id: JobID, createdBy: UserID },
    body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFound(`No job found with id ${JobID}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { UserID },
    params: { id: JobID },
  } = req;
  const job = await Job.findOneAndRemove({ _id: JobID, createdBy: UserID });
  console.log(typeof job);
  if (!job) {
    throw new NotFound(`No job found with id ${JobID}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: `Job with id ${JobID} deleted successfully.` });
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
};

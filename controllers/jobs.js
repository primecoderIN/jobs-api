const Job = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy : req.user.UserID }).sort("createdAt");
  res.status(StatusCodes.OK).json({jobs,TotalRecords: jobs.length});
};

const getJob = async (req, res) => { 
  const createdBy = req.user.UserID;
  const jobs = await Job.find({ createdBy });
  res.status(StatusCodes.OK).json(jobs);
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.UserID;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  res.send("Update Job");
};
const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
};
